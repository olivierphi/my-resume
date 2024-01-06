# Dunsap.com - online resume

What could be more pleasant than totally over-engineering your online resume when you're a Web Developer in 2023?

Here is the history of this "over-engineered CV" project:
 - [The very first version](https://github.com/olivierphi/my-resume/tree/v1) was using Node.js, CoffeeScript, Vagrant and gulp (2013! :-).
 - The second version, in 2016, was written in [goold ol' PHP](https://github.com/olivierphi/my-resume/tree/php-version).
 - The third one, in 2017, was built [with isomorphic React](https://github.com/olivierphi/my-resume/tree/react-version) as I was in the process of getting up to speed with React.
 - After that I wanted to give Vue.js a shot, so in 2018 I wrote [a Vue.js version](https://github.com/olivierphi/my-resume/tree/vue-version). I wasn't a huge fan of Vue.js in the end, but I still kept that version running for a few years.

Well, for this 5th flavour I opted for... a "full [Django](https://www.djangoproject.com/)" setup!

So, in order to generate only 2 HTML pages and 2 PDF files, I had the pleasure to use all these wonderful technologies: ✨

- A Django project that parses my resume data (stored in [TOML](https://github.com/toml-lang/toml) format, now readable by Python's own standard library 💚) and inject it into HTML templates.
- Live generation of the CSS file, powered by [Tailwind](https://tailwindcss.com/) - without any dependency on Node.js, thanks to [django-tailwind-cli](https://github.com/oliverandrich/django-tailwind-cli).
- Live reloading in the browser, powered by [django-browser-reload](https://github.com/adamchainz/django-browser-reload).
- Automatic local copy of Google Fonts, thanks to [django-google-fonts](https://github.com/andymckay/django-google-fonts).
   _(that's one of the reasons behind that: [The Court Says, Don’t Use Google Fonts](https://insights.project-a.com/the-court-says-dont-use-google-fonts/))_
- PDF files are generated from the HTML ones, via [Playwright](https://github.com/microsoft/playwright-python).
- All these static files are deployed to GitHub Pages by [ghp-import](https://github.com/c-w/ghp-import).
- [A GitHub Action](.github/workflows/deploy.yml) builds and deploys the static assets automatically on every merge to the branch.

On top of that I also use some classic Python and Django packages such as
[Poetry](https://python-poetry.org/),
[MyPy](https://www.mypy-lang.org/),
[Black](https://black.readthedocs.io/en/stable/),
[Ruff](https://docs.astral.sh/ruff/) _(still using Black for formatting at the moment, though)_,
[pre-commit](https://pre-commit.com/),
[djLint](https://www.djlint.com/) or
[django-fastdev](https://github.com/boxed/django-fastdev).

## Is it really over-engineered?

```bash
$ ls -l .venv/lib/python3.12/site-packages/*/METADATA | wc -l
64
```

Yes it is! ✌ 😅

#### N.B. Only 5 direct dependencies are needed to build and deploy the project

To be fair, there are 8 direct "dev dependencies" to manage things such as live reloading or code quality,
but only 5 direct packages are actually needed to build and deploy the project from scratch in the GitHub Actions pipeline,
so the amount of third-party code installed there should be more reasonable.

Let's check that locally:
```bash
$ python -m venv .venv-ci --prompt .venv-ci
$ source .venv-ci/bin/activate
$ pipx run poetry==1.7.1 install --no-root --only=main,deployment
$ ls -l .venv-ci/lib/python3.12/site-packages/*/METADATA | wc -l
20 # better! 😌
```


## Usage

```bash
$ pyenv use 3.12
$ make install # will create a virtual env in ".venv/"
$ make dev # starts the Django server on port 8000, with live reloading
```

To build the static assets (HTML, CSS, images, PDF versions...)
```bash
$ make build-and-create-pdfs
```

## LICENSE

Excepted files in the `myresume/staticfiles/img` folder _(I don't have any rights on them, as it's just images found via search engines that I cropped and resized)_,
this app is licensed under the MIT license.
