module.exports = {
    extends: [
        "@commitlint/config-angular"
    ],
    rules: {
        'type-enum': [2, 'always', [
            'update',
            'feat',
            'fix',
            'refactor',
            'docs',
            'chore',
            'style',
            'revert',
        ]],
        'header-max-length': [0, 'always', 72]
    }
}