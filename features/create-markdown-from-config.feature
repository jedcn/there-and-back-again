Feature: create-markdown-from-config

  Initialize a markdown file based on an existing configuration.

  If you had 10 config files, you'd run this tool once for each file that you
  wanted to track *in* markdown.

  Scenario: create-markdown-from-config --config-file <CONFIG_FILE>
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
    When I run `create-markdown-from-config --config-file config.json`
    Then the exit status should be 0
    Then the file "config.json.md" should contain:
    """
    # config.json

    ```
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
    ```
    """
