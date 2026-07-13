<?php
// Contactformulier -> e-mail voor ellenbruistmee.nl (Plesk/mijndomein hosting)
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');

// Alleen POST toestaan
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Velden ophalen en opschonen
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$role    = trim($_POST['role'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validatie
if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Ongeldige invoer']);
    exit;
}

// Bescherm tegen header-injectie in naam/e-mail
$name  = str_replace(["\r", "\n"], ' ', $name);
$email = str_replace(["\r", "\n"], ' ', $email);

$to      = 'ellen@ellenbruistmee.nl';
$fromAddr = 'ellen@ellenbruistmee.nl'; // moet een bestaande postbus op het domein zijn
$subject = 'Nieuw bericht via ellenbruistmee.nl';

$safeMessage = str_replace(["\r\n", "\r"], "\n", $message);

$body = "Je hebt een nieuw bericht ontvangen via het contactformulier:\n\n"
      . "Naam:   $name\n"
      . "E-mail: $email\n"
      . "Rol:    $role\n\n"
      . "Bericht:\n$safeMessage\n";

// From op het eigen domein (SPF/DKIM); Reply-To = de bezoeker
$headers  = "From: Ellen Bruist mee (website) <$fromAddr>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

// De 5e parameter (-f) zet de envelope-afzender; veel Plesk/shared hosts
// weigeren mail() zonder een geldige envelope-afzender op het eigen domein.
$sent = @mail($to, $encodedSubject, $body, $headers, '-f' . $fromAddr);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    $err = error_get_last();
    http_response_code(500);
    echo json_encode([
        'ok'     => false,
        'error'  => 'Verzenden mislukt',
        'detail' => $err['message'] ?? 'geen details beschikbaar',
    ]);
}
