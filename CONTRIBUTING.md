# Contributing to Viral Shorts AI Agent

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Request Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes (`npm test`)
4. Make sure your code lints (`npm run lint`)
5. Issue that pull request!

## Coding Standards

### JavaScript/Node.js

- Use ES6+ syntax
- Use async/await for asynchronous operations
- Add JSDoc comments for complex functions
- Follow the existing code style
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop validation
- Follow accessibility guidelines (WCAG 2.1)

## Commit Message Format

Use conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(video-editor): add transition effects

Added support for multiple transition types between scenes.
Implemented crossfade, wipe, and zoom transitions.

Closes #42
```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for at least 80% code coverage
- Use meaningful test descriptions

## Documentation

- Update README.md if needed
- Document API endpoints with examples
- Add comments for complex logic
- Update CHANGELOG.md

## Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Step-by-step instructions
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node.js version, npm version
6. **Screenshots**: If applicable
7. **Error Messages**: Full error traces

## Suggesting Enhancements

When suggesting enhancements:

1. Use a clear title
2. Provide detailed description
3. Explain why this would be useful
4. List examples of existing features with similar functionality

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Our Standards

Examples of behavior that contribute to a positive environment:

- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
