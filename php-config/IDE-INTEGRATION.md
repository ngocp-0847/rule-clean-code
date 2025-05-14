# IDE Integration Guide for PHP_CodeSniffer

This guide explains how to integrate our custom PHP coding standards with popular IDEs.

## VS Code Integration

### Prerequisites

1. Install the [PHP Sniffer & Beautifier](https://marketplace.visualstudio.com/items?itemName=ValeryanM.vscode-phpsab) extension

### Configuration

1. Open VS Code settings (File > Preferences > Settings)
2. Search for "phpsab"
3. Edit the settings.json file to include:

```json
{
    "phpsab.executablePathCS": "/home/[username]/.config/composer/vendor/bin/phpcs",
    "phpsab.standard": "php-config",
    "phpsab.fixerEnable": true,
    "phpsab.snifferEnable": true,
    "phpsab.snifferShowSources": true,
    "phpsab.executablePathCBF": "/home/[username]/.config/composer/vendor/bin/phpcbf"
}
```

Replace `[username]` with your actual username.

## PhpStorm Integration

1. Go to Settings > PHP > Quality Tools > PHP_CodeSniffer
2. Set the path to the PHP_CodeSniffer executable (usually `~/.config/composer/vendor/bin/phpcs`)
3. Go to Settings > Editor > Inspections
4. Find "PHP > Quality Tools > PHP_CodeSniffer validation"
5. Check the "Show sniff name" option
6. Set the "Coding standard" to "Custom" and point to your `php-config/ruleset.xml` file

## Sublime Text Integration

1. Install [Package Control](https://packagecontrol.io/installation)
2. Install the "Phpcs" package
3. Open the Phpcs settings (Preferences > Package Settings > PHP Code Sniffer > Settings - User)
4. Add the following configuration:

```json
{
    "phpcs_executable_path": "/home/[username]/.config/composer/vendor/bin/phpcs",
    "phpcs_additional_args": {
        "--standard": "/home/[username]/Documents/projects/rule-clean-code/php-config",
        "-n": ""
    },
    "phpcbf_executable_path": "/home/[username]/.config/composer/vendor/bin/phpcbf",
    "phpcbf_additional_args": {
        "--standard": "/home/[username]/Documents/projects/rule-clean-code/php-config",
        "-n": ""
    },
    "phpcs_execute_on_save": true,
    "phpcs_show_errors_on_save": true
}
```

Replace `[username]` with your actual username.

## Vim/NeoVim Integration

For Vim users with [ALE (Asynchronous Lint Engine)](https://github.com/dense-analysis/ale):

Add the following to your `.vimrc` or `init.vim`:

```vim
let g:ale_php_phpcs_executable = '/home/[username]/.config/composer/vendor/bin/phpcs'
let g:ale_php_phpcs_standard = '/home/[username]/Documents/projects/rule-clean-code/php-config'
```

For Vim users with [Syntastic](https://github.com/vim-syntastic/syntastic):

```vim
let g:syntastic_php_phpcs_exec = '/home/[username]/.config/composer/vendor/bin/phpcs'
let g:syntastic_php_phpcs_args = '--standard=/home/[username]/Documents/projects/rule-clean-code/php-config'
```

Replace `[username]` with your actual username.
