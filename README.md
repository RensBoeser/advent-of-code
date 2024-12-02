The project uses Deno to run the code snippets.

# Install Deno

Windows:

```bash
irm https://deno.land/install.ps1 | iex
```

macOS / Linux:

```bash
curl -fsSL https://deno.land/install.sh | sh
```

# Run scripts

To run any of the code snippets:

```bash
deno run --allow-read ./2024/day-1/index.ts
```

To benchmark any of the code snippets:

```bash
deno bench --allow-read ./2024/day-1/index.ts
```
