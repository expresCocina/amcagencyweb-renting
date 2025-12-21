$pages = @{
    "AboutPage.jsx" = "import './AboutPage.css';"
    "AcademyPage.jsx" = "import './SEOPage.css';"
    "BlogPage.jsx" = "import './BlogPage.css';"
    "BookingPage.jsx" = "import './BookingPage.css';"
    "BudgetCalculatorPage.jsx" = "import './BudgetCalculatorPage.css';"
    "CreditPage.jsx" = "import './SEOPage.css';"
    "PrivacyPolicyPage.jsx" = "import './PolicyPage.css';"
    "TermsPage.jsx" = "import './PolicyPage.css';"
    "ResourcesPage.jsx" = "import './ResourcesPage.css';"
    "LoginPage.jsx" = "import './LoginPage.css';"
    "DemoGeneratorPage.jsx" = "import './DemoGeneratorPage.css';"
    "PromoLandingPage.jsx" = "import './PromoLandingPage.css';"
}

foreach ($page in $pages.Keys) {
    $file = "src\pages\$page"
    $oldImport = $pages[$page]
    $newImport = "import './SharedPageStyles.css';`n$oldImport"
    
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -notmatch "SharedPageStyles") {
            $content = $content -replace [regex]::Escape($oldImport), $newImport
            Set-Content $file $content -NoNewline
            Write-Host "Updated $page"
        }
    }
}
