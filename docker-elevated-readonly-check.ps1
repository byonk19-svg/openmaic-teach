$outputPath = 'C:\Users\byonk\OneDrive\Documents\ChatGPT\Teach\docker-elevated-readonly-output.txt'
& {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = [Security.Principal.WindowsPrincipal]::new($identity)
    "Elevated administrator: $($principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))"
    'COMMAND: fsutil reparsepoint query'
    & fsutil.exe reparsepoint query 'C:\Users\byonk\AppData\Local\Docker\run\sailor-ingest.sock'
    "fsutil exit code: $LASTEXITCODE"
    'COMMAND: fltmc'
    & fltmc.exe
    "fltmc exit code: $LASTEXITCODE"
    'CHECKS COMPLETE'
} *>&1 | Out-File -LiteralPath $outputPath -Encoding utf8
