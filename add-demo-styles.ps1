$demoPages = @(
    "EcoTiendaDemo.jsx",
    "InmobiliariaDemo.jsx",
    "ClinicaDentalDemo.jsx",
    "TechStartDemo.jsx",
    "RestauranteDemo.jsx",
    "AcademiaDemo.jsx",
    "BoutiqueDemo.jsx",
    "ConsultoraDemo.jsx"
)

foreach ($demo in $demoPages) {
    $file = "src\pages\demos\$demo"
    
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Add SharedPageStyles if not present
        if ($content -notmatch "SharedPageStyles") {
            # Find the first import statement
            if ($content -match "import.*from") {
                $content = $content -replace "(import.*?;)", "`$1`nimport '../SharedPageStyles.css';"
                Set-Content $file $content -NoNewline
                Write-Host "Updated $demo with SharedPageStyles"
            }
        }
    }
}
