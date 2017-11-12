Feature: --help output

  What happens when you run a tool with `--help`?

  Scenario: create-markdown-from-config --help
    When I run `create-markdown-from-config --help`
    Then the exit status should be 0
    And the output should match:
    """
      Usage:

        create-markdown-from-config --config-file <CONFIG_FILE>
    """

  Scenario: extract-config-from-markdown --help
    When I run `extract-config-from-markdown --help`
    Then the exit status should be 0
    And the output should match:
    """
      Usage:

        extract-config-from-markdown --config-file <CONFIG_FILE> --markdown-file <MARKDOWN_FILE>
    """

  Scenario: update-markdown-from-config --help
    When I run `update-markdown-from-config --help`
    Then the exit status should be 0
    And the output should match:
    """
      Usage:

        update-markdown-from-config --config-file <CONFIG_FILE> --markdown-file <MARKDOWN_FILE>
    """
