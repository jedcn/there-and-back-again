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
