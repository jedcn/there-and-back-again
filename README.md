# There and Back Again

Two-way [literate programming][literate] between markdown and config files.

[literate]: https://en.wikipedia.org/wiki/Literate_programming

## Getting started

Imagine you have an existing configuration file named `config.json`.

You can initialize a markdown file that'll contain `config.json` as
follows:

```sh
create-markdown-from-config --config-file config.json
```

Now you'll have a file named `config.md` that has a single
triple-fenced block of code in it.

This block of code will contain the entire contents of `config.json`.

You should check both files into version control

## Updates to your config file

Next up, you edit `config.json` for whatever reason with whatever tool
you chose.

You can (and should) keep `config.md` in sync as follows:

```sh
update-markdown-from-config --markdown-file config.md --config-file config.json
```

## Updates to your markdown file

Until now, your markdown file has contained a single triple-fenced
block of your config.

You can fire up your favorite editor and break this into several
smaller code blocks providing some description for each block.

Next, you can extract the distinct code blocks you just created back
to the config:

```sh
update-config-from-markdown --markdown-file config.md --config-file config.json
```

## The cycle continues

You can continue to modify either the config or the markdown and use
these two commands `update-config-from-markdown` and `update-
markdown-from-config` to go back and forth.

Your config will remain machine/program readable and usable, while
your markdown can be shared with your friends.

Markdown files can also be used to build websites!
