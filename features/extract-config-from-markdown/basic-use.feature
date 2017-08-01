Feature: extract-config-from-markdown

  This command is run after a markdown file exists.

  It supports the user modifying the markdown file in place and then
  extracting (writing out) these changes to the config file.

  Scenario: A config file exists and is overwritten
    Given a file named "init.vim" with:
    """
    This will be overwritten.
    """
    And a file named "init.vim.md" with:
    """
    # init.vim.md

    ```
    " set character encoding
    scriptencoding utf-8
    set encoding=utf-8
    " set leader to space
    let mapleader = " "
    ```
    """
    When I run `extract-config-from-markdown --markdown-file init.vim.md --config-file init.vim`
    Then the exit status should be 0
    Then the file "init.vim" should contain:
    """
    " set character encoding
    scriptencoding utf-8
    set encoding=utf-8
    " set leader to space
    let mapleader = " "
    """

  Scenario: A config file does not exist and is created anew
    Given a file named "init.vim.md" with:
    """
    # init.vim.md

    ## Character Encoding

    ```
    scriptencoding utf-8
    set encoding=utf-8
    ```

    ## Leader

    I use space!

    ```
    let mapleader = " "
    ```
    """
    When I run `extract-config-from-markdown --markdown-file init.vim.md --config-file init.vim`
    Then the exit status should be 0
    Then the file "init.vim" should contain:
    """
    scriptencoding utf-8
    set encoding=utf-8
    let mapleader = " "
    """

    Given a file named "config.json.md" with:
    """
    # config.json

    This is my eslint config!

    ```
    {
    ```

    ## Parser Options

    I like JSX!

    ```
        "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
        },
    ```

    ## Rules

    When it comes to rules, I'm pretty intense!

    ```
        "rules": {
    ```

    ### Semicolons

    It's an error unless you're always using semi-colons.

    ```
            "semi": ["error", "always"],
    ```

    ### Quotes

    It's an error if you don't use double quotes.

    ```
            "quotes": ["error", "double"]
        }
    }
    ```
    """
    When I run `extract-config-from-markdown --markdown-file config.json.md --config-file config.json`
    Then the exit status should be 0
    Then the file "config.json" should contain:
    """
    {
        "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
        },
        "rules": {
            "semi": ["error", "always"],
            "quotes": ["error", "double"]
        }
    }
    """
