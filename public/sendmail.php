<?php
// Contactformulier -> e-mail voor ellenbruistmee.nl via SMTP (Plesk/mijndomein)
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');

// ======================= INSTELLINGEN =======================
// SMTP via mijndomein (de mail van ellenbruistmee.nl loopt via mijndomein).
//
// >>> VUL HIERONDER BIJ $SMTP_PASS HET WACHTWOORD VAN DE MAILBOX
//     ellen@ellenbruistmee.nl IN (tussen de aanhalingstekens). <<<
//
// Werkt 465/SSL niet? Probeer dan poort 587 met TLS:
//   $SMTP_PORT = 587;  $SMTP_SECURE = 'tls';
$SMTP_HOST   = 'smtp.mijndomein.nl';
$SMTP_PORT   = 465;
$SMTP_SECURE = 'ssl';                       // 465 = 'ssl', 587 = 'tls'
$SMTP_USER   = 'ellen@ellenbruistmee.nl';
$SMTP_PASS   = '';                          // <-- WACHTWOORD HIER INVULLEN

$TO        = 'ellen@ellenbruistmee.nl';
$FROM       = 'ellen@ellenbruistmee.nl';
$FROM_NAME  = 'Ellen Bruist mee (website)';
// ============================================================

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$role    = trim($_POST['role'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Ongeldige invoer']);
    exit;
}

// Tegen header-injectie
$name  = str_replace(["\r", "\n"], ' ', $name);
$email = str_replace(["\r", "\n"], ' ', $email);

$subject     = 'Nieuw bericht via ellenbruistmee.nl';
$safeMessage = str_replace(["\r\n", "\r"], "\n", $message);

$bodyText = "Je hebt een nieuw bericht ontvangen via het contactformulier:\n\n"
          . "Naam:   $name\n"
          . "E-mail: $email\n"
          . "Rol:    $role\n\n"
          . "Bericht:\n$safeMessage\n";

$result = smtp_send(
    $SMTP_HOST, $SMTP_PORT, $SMTP_SECURE, $SMTP_USER, $SMTP_PASS,
    $FROM, $FROM_NAME, $TO, "$name <$email>", $subject, $bodyText
);

if ($result === true) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Verzenden mislukt', 'detail' => $result]);
}

// --- Minimale SMTP-client (geen externe libs) ---
function smtp_send($host, $port, $secure, $user, $pass, $from, $fromName, $to, $replyTo, $subject, $body) {
    $remote = ($secure === 'ssl' ? 'ssl://' : '') . $host;
    $fp = @fsockopen($remote, $port, $errno, $errstr, 15);
    if (!$fp) return "verbinden mislukt: $errstr ($errno)";
    stream_set_timeout($fp, 15);

    $read = function () use ($fp) {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };
    $cmd = function ($line) use ($fp) { fwrite($fp, $line . "\r\n"); };
    $code = function ($resp) { return (int) substr($resp, 0, 3); };

    if ($code($read()) !== 220) { fclose($fp); return 'geen 220-begroeting'; }

    $cmd("EHLO ellenbruistmee.nl");
    if ($code($read()) !== 250) { fclose($fp); return 'EHLO geweigerd'; }

    if ($secure === 'tls') {
        $cmd("STARTTLS");
        if ($code($read()) !== 220) { fclose($fp); return 'STARTTLS geweigerd'; }
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT)) {
            fclose($fp); return 'TLS-handshake mislukt';
        }
        $cmd("EHLO ellenbruistmee.nl");
        if ($code($read()) !== 250) { fclose($fp); return 'EHLO (na TLS) geweigerd'; }
    }

    if ($user !== '') {
        $cmd("AUTH LOGIN");
        if ($code($read()) !== 334) { fclose($fp); return 'AUTH niet ondersteund'; }
        $cmd(base64_encode($user));
        if ($code($read()) !== 334) { fclose($fp); return 'gebruikersnaam geweigerd'; }
        $cmd(base64_encode($pass));
        if ($code($read()) !== 235) { fclose($fp); return 'inloggen mislukt (wachtwoord?)'; }
    }

    $cmd("MAIL FROM:<$from>");
    if ($code($read()) !== 250) { fclose($fp); return 'MAIL FROM geweigerd'; }
    $cmd("RCPT TO:<$to>");
    $rcpt = $code($read());
    if ($rcpt !== 250 && $rcpt !== 251) { fclose($fp); return 'RCPT TO geweigerd'; }
    $cmd("DATA");
    if ($code($read()) !== 354) { fclose($fp); return 'DATA geweigerd'; }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers  = "From: $fromName <$from>\r\n";
    $headers .= "Reply-To: $replyTo\r\n";
    $headers .= "To: <$to>\r\n";
    $headers .= "Subject: $encodedSubject\r\n";
    $headers .= "Date: " . date('r') . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Normaliseer naar CRLF en pas dot-stuffing toe
    $data = $headers . "\r\n" . $body;
    $data = preg_replace("/\r\n|\r|\n/", "\r\n", $data);
    $data = preg_replace('/^\./m', '..', $data);

    fwrite($fp, $data . "\r\n.\r\n");
    if ($code($read()) !== 250) { fclose($fp); return 'bericht geweigerd bij verzenden'; }

    $cmd("QUIT");
    fclose($fp);
    return true;
}
