Feature: update-markdown-from-config

  This command is run after a markdown file exists and the extracted config
  has changed.

  The command analyzes the changes in the extracted config and applies them to
  the code blocks in the markdown file.

  Scenario: A markdown file exists, a config file was extracted from it, and the config file has changed
    Given a file named "config.json" with:
    """
    // My Config
    {
      //  Display values
      "color": "red",
      "syntax_highlight": true,
      //  Command values
      "saveOnClose": true,
      "saveOnTabSwitch": false
    // In Closing
    }
    """
    And a file named "config.json.md" with:
    """
    # My Config

    This is my editor config.

    ```
    {
    ```

    ## Display values

    I like the color blue.

    I don't like syntax highlighting.

    ```
      "color": "blue",
      "syntax_highlight": false,
    ```

    ## Command values

    I like to save all the time.

    ```
      "saveOnClose": true,
      "saveOnTabSwitch": true
    ```

    # In Closing

    ```
    }
    ```
    """
    When I run `update-markdown-from-config --markdown-file config.json.md --config-file config.json`
    Then the exit status should be 0
    Then the file "config.json.md" should contain:
    """
    # My Config

    This is my editor config.

    ```
    {
    ```

    ## Display values

    I like the color blue.

    I don't like syntax highlighting.

    ```
      "color": "red",
      "syntax_highlight": true,
    ```

    ## Command values

    I like to save all the time.

    ```
      "saveOnClose": true,
      "saveOnTabSwitch": false
    ```

    # In Closing

    ```
    }
    ```
    """
