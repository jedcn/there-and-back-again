# There and Back Again

Two-way [literate programming][literate] between markdown and json config files.

[literate]: https://en.wikipedia.org/wiki/Literate_programming

While it's true actual JSON can't have comments, the JSON config files used by
editors like Sublime and Visual Code allow them.

## Getting started

Imagine you have an existing configuration file named `settings.json`.

You can initialize a markdown file that'll contain `settings.json` as follows:

```sh
create-markdown-from-config --config-file settings.json
```

Now you'll have a file named `settings.json.md` that has a single triple-fenced
block of code in it.

This block of code will contain the entire contents of `settings.json`.

You should check both files into version control.

## Updates to your config file

Next up, you edit `settings.json` for whatever reason within Sublime or Visual
Code.

You can (and should) keep `settings.json.md` in sync as follows:

```sh
update-markdown-from-config --markdown-file settings.json.md --config-file settings.json
```

## Updates to your markdown file

Until now, your markdown file has contained a single triple-fenced block of your
config.

You can fire up your favorite editor and break this into several smaller code
blocks providing some description for each block.

Next, you can extract the distinct code blocks you just created back to the
config:

```sh
extract-config-from-markdown --markdown-file settings.json.md --config-file settings.json
```

## The cycle continues

You can continue to modify either the config or the markdown and use these two
commands `extract-config-from-markdown` and `update-markdown-from-config` to go
back and forth.

Your config will remain machine/program readable and usable, while your markdown
can be shared with your friends.

## Interested?

[Learn More..](./docs/README.md)
