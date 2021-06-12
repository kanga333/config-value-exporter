# config-value-exporter

This is a Github Action to export configuration file value to output.

## Example

This is example that to export name's value from `package.json`.

```yaml
name: 'example'
on: # rebuild any PRs and main branch changes
  pull_request:
  push:
    branches:
      - main
jobs:
  export-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: kanga333/config-value-exporter@main
        id: name
        with:
          key: name
          file: package.json
      - run: |
          # echo 'config-value-exporter'
          echo '${{steps.name.outputs.result}}'
```
