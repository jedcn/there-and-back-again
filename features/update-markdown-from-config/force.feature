Feature: update-markdown-from-config --force

  If you want to update a markdown file from a config there's a non-zero
  chance that what would be "put" into the markdown file won't match the
  config.

  If this happens there-and-back-again prints a warning and doens't do
  anything.

  Unless you add `--force true` in which case it'll overwrite.

  Scenario: A problem has been encountered and the user didn't specify --force
  Given a file named "some.config" with:
  """
  {
    "what": "the what what"
  }
  THIS SHOULDN'T CHANGE
  {
    "what": "the what what"
  }

  """
  And a file named "some.config.md" with:
  """
  # some.config

  ```
  THIS SHOULDN'T CHANGE
  ```
  """
  When I run `update-markdown-from-config --markdown-file some.config.md --config-file some.config`
  Then the exit status should be 1
  And the output should match:
  """
  Rut ro! Could not correctly create markdown file.
  The code blocks in the new markdown do not match the config.
  """
  And the file "some.config.md" should contain:
  """
  # some.config

  ```
  THIS SHOULDN'T CHANGE
  ```
  """

  Scenario: A conflict exists and the user did specify --force
  Given a file named "some.config" with:
  """
  {
    "what": "the what what"
  }

  """
  And a file named "some.config.md" with:
  """
  {
    "what": "the what what"
  }
  THIS SHOULDN'T CHANGE
  {
    "what": "the what what"
  }

  """
  When I run `update-markdown-from-config --markdown-file some.config.md --config-file some.config --force true`
  Then the exit status should be 0
  Then the file "some.config.md" should contain:
  """
  {
    "what": "the what what"
  }
  {
    "what": "the what what"
  }
  THIS SHOULDN'T CHANGE
  {
    "what": "the what what"
  }

  """
