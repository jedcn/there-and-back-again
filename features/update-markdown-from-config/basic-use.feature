Feature: update-markdown-from-config

  This command is run after a markdown file exists and the extracted config
  has changed.

  The command analyzes the changes in the extracted config and applies them to
  the code blocks in the markdown file.

  Scenario: A markdown file exists, a config file was extracted from it, and the config file has changed
  Given a file named ".zshrc" with:
    """
    ZSH=$HOME/.oh-my-zsh
    DISABLE_CORRECTION="true"
    plugins=()
    ZSH_THEME="sorin"
    source $ZSH/oh-my-zsh.sh
    alias b='bundle'
    alias bec='bundle exec cucumber'
    alias gcom='git checkout master'
    alias gdom='git diff origin/master'
    alias gpom='git push origin master'
    alias grom='git reset --hard origin/master'

    """
  And a file named ".zshrc.md" with:
    """
    # .zshrc config

    ## Necessary Setup

    I'm not sure what these are-- but they were here when I got here.

    ```
    ZSH=$HOME/.oh-my-zsh
    ```

    ## Plugins

    I only use a single plugin: git

    ```
    plugins=(git)
    ```

    ## Theme

    This theme is nice on the eyes.

    ```
    ZSH_THEME="sorin"
    ```

    ## OH MY ZSH

    ```
    source $ZSH/oh-my-zsh.sh
    ```

    ## Aliass

    First we deal with bundle..

    ```
    alias b='bundle'
    alias be='bundle exec'
    alias bec='bundle exec cucumber'
    ```

    And then we deal with some git stuff..

    ```
    alias gcom='git checkout master'
    alias gdom='git diff origin/master'
    alias gpom='git push origin master'
    alias grom='git reset origin/master'
    ```
    """
    When I run `update-markdown-from-config --markdown-file .zshrc.md --config-file .zshrc`
    Then the exit status should be 0
    Then the file ".zshrc.md" should contain:
    """
    # .zshrc config

    ## Necessary Setup

    I'm not sure what these are-- but they were here when I got here.

    ```
    ZSH=$HOME/.oh-my-zsh
    ```

    ## Plugins

    I only use a single plugin: git

    ```
    DISABLE_CORRECTION="true"
    plugins=()
    ```

    ## Theme

    This theme is nice on the eyes.

    ```
    ZSH_THEME="sorin"
    ```

    ## OH MY ZSH

    ```
    source $ZSH/oh-my-zsh.sh
    ```

    ## Aliass

    First we deal with bundle..

    ```
    alias b='bundle'
    alias bec='bundle exec cucumber'
    ```

    And then we deal with some git stuff..

    ```
    alias gcom='git checkout master'
    alias gdom='git diff origin/master'
    alias gpom='git push origin master'
    alias grom='git reset --hard origin/master'
    ```
    """
