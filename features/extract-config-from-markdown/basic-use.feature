Feature: extract-config-from-markdown

  This command is run after a markdown file exists.

  It supports the user modifying the markdown file in place and then
  extracting (writing out) these changes to the config file.

  Scenario: A config file exists and is overwritten
    Given a file named "config.json" with:
    """
    This will be overwritten.
    """
    And a file named "config.json.md" with:
    """
    # My Config

    This is my editor config.

    ```
    {
    ```

    ## Display values

    I like the color red.

    I like syntax highlighting.

    ```
      "color": "red",
      "syntax_highlight": true,
    ```

    ## Command values

    I like to save some of the time.

    ```
      "saveOnClose": true,
      "saveOnTabSwitch": false
    ```

    # In closing

    ```
    }
    ```
    """
    When I run `extract-config-from-markdown --markdown-file config.json.md --config-file config.json`
    Then the exit status should be 0
    Then the file "config.json" should contain:
    """
    // My Config
    {
      // Display values
      "color": "red",
      "syntax_highlight": true,
      // Command values
      "saveOnClose": true,
      "saveOnTabSwitch": false
    // In closing
    }
    """
