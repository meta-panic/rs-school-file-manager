# CLI File Manager

A command-line file management tool for basic file operations.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/meta-panic/rs-school-file-manager.git
```

## Usage

```bash
npm start -- --username=your_username
```

## Usage Notes

### Handling Paths with Spaces
When working with directories containing spaces in their names:
✅ **Use double quotes**:
```bash
> cd "New Folder"
```

❌ Avoid single quotes:
```bash
> cd 'New Folder'  # This might not work as expected
```

## Examples

1. List contents of current directory:
```bash
> ls
```

2. Print host machine CPUs info:
```bash
> os --cpus
```

## License
MIT License - see [LICENSE](LICENSE) for details 