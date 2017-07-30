Feature: update-config-from-markdown

  This command is run after a markdown file exists and a config file exists.

  The user has modified the code blocks in the markdown file and wants to have these modifications written out to the config file.

  Scenario: The markdown file contains slight changes
    Given PENDING ✊ ✊ 👆
    Given a file named "config.json" with:
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
            "semi": 2
        }
    }
    """
    And a file named "config.js.md" with:
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
    When I run `update-config-from-markdown --markdown-file config.json.md --config-file config.json`
    Then the exit status should be 0
    Then the file "config.json" should contain:
    """
    {
        "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module"
        },
        "rules": {
            "semi": ["error", "always"],
            "quotes": ["error", "double"]
        }
    }
    """
