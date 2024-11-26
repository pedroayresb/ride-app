import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from "eslint-config-prettier";
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default tseslint.config(
  { ignores: ['dist', 'package.json', 'tsconfig.json'] },
  {
    extends: [
      js.configs.recommended,
      eslintConfigPrettier,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs
    },
    rules: {
      'indent': ['error', 2],
      '@stylistic/js/array-bracket-newline': ['error', {
        multiline: true,
        minItems: 3,
      }],
      '@stylistic/js/array-bracket-spacing': ['error', 'always', {
        singleValue: false,
        objectsInArrays: false,
        arraysInArrays: false,
      }],
      '@stylistic/js/array-element-newline': ['error', {
        ArrayExpression: 'consistent',
        ArrayPattern: { minItems: 3 },
      }],
      '@stylistic/js/arrow-parens': ['error', 'as-needed'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/block-spacing': ['error', 'always'],
      '@stylistic/ts/block-spacing': ['error', 'always'],
      '@stylistic/js/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      '@stylistic/ts/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/ts/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/comma-style': ['error', 'last'],
      '@stylistic/js/computed-property-spacing': ['error', 'never'],
      '@stylistic/js/dot-location': [
        'error',
        'property',
      ],
      '@stylistic/js/eol-last': ['error', 'always'],
      '@stylistic/js/func-call-spacing': ['error', 'never'],
      '@stylistic/ts/func-call-spacing': ['error', 'never'],
      '@stylistic/js/function-call-argument-newline': [
        'error',
        'consistent',
      ],
      '@stylistic/js/function-call-spacing': ['error', 'never'],
      '@stylistic/js/function-paren-newline': 'off',
      '@stylistic/js/generator-star-spacing': ['error', 'after'],
      '@stylistic/js/implicit-arrow-linebreak': ['error', 'beside'],
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/js/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/js/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      '@stylistic/ts/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      '@stylistic/js/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/ts/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/line-comment-position':  'off',
      '@stylistic/js/lines-between-class-members': ['error', 'always'],
      '@stylistic/ts/lines-between-class-members': ['error', 'always'],
      '@stylistic/js/max-len': ['error', {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
      }],
      '@stylistic/js/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/ts/member-delimiter-style': ['error', {
        multiline: {
          "delimiter": "semi",
          "requireLast": true
        },
        singleline: {
          "delimiter": "semi",
          "requireLast": false
        },
        "multilineDetection": "brackets"
      }],
      '@stylistic/js/multiline-comment-style': ['error', 'starred-block'],
      '@stylistic/js/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/js/new-parens': ['error', 'always'],
      '@stylistic/js/newline-per-chained-call': ['error',
        { ignoreChainWithDepth: 2 },
      ],
      '@stylistic/js/no-confusing-arrow': ['error', { allowParens: true }],
      '@stylistic/js/no-extra-parens': ['error', 'all', { nestedBinaryExpressions: false }],
      '@stylistic/ts/no-extra-parens': ['error', 'all', { nestedBinaryExpressions: false }],
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/ts/no-extra-semi': 'error',
      '@stylistic/js/no-floating-decimal': 'error',
      '@stylistic/js/no-mixed-operators': 'error',
      '@stylistic/js/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/js/no-tabs': 'error',
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/no-whitespace-before-property': 'error',
      '@stylistic/js/nonblock-statement-body-position': ['error', 'beside'],
      '@stylistic/js/object-curly-newline': ['error', {
        ObjectExpression: {
          multiline: true,
          minProperties: 1,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 1,
          consistent: true,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
          consistent: true,
        },
      }],
      '@stylistic/ts/object-curly-newline': ['error', {
        ImportDeclaration: {
          multiline: true,
          minProperties: 1,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 1,
          consistent: true,
        },
      }],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: false,
      }],
      '@stylistic/ts/object-property-newline': 'error',
      '@stylistic/js/one-var-declaration-per-line': ['error', 'always'],
      '@stylistic/js/operator-linebreak': ['error', 'after'],
      '@stylistic/js/padded-blocks': ['error', 'never'],
      '@stylistic/js/padding-line-between-statements': [
        'error',
        { blankLine: "always", prev: "*", next: "return" }
      ],
      '@stylistic/ts/padding-line-between-statements': [
        'error',
        { blankLine: "always", prev: "*", next: "return" }
      ],
      '@stylistic/js/quote-props': [
        'error',
        'consistent-as-needed',
      ],
      '@stylistic/ts/quote-props': [
        'error',
        'consistent-as-needed',
      ],
      '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/ts/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/js/rest-spread-spacing': ['error', 'never'],
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/ts/semi': ['error', 'always'],
      '@stylistic/js/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/semi-style': ['error', 'last'],
      '@stylistic/js/space-before-blocks': ['error', 'always'],
      '@stylistic/ts/space-before-blocks': ['error', 'always'],
      '@stylistic/js/space-before-function-paren': ['error', 'never'],
      '@stylistic/ts/space-before-function-paren': ['error', 'never'],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/space-infix-ops': 'error',
      '@stylistic/ts/space-infix-ops': 'error',
      '@stylistic/js/space-unary-ops': ['error', { words: true, nonwords: false }],
      '@stylistic/js/spaced-comment': ['error', 'always'],
      '@stylistic/js/switch-colon-spacing': ['error', { after: true, before: false }],
      '@stylistic/js/template-curly-spacing': ['error', 'never'],
      '@stylistic/ts/type-annotation-spacing': ['error', {
        after: true,
        before: false,
        overrides: {
          arrow: {
            after: true,
            before: true,
          }
        }
      }],
      '@stylistic/js/template-tag-spacing': ['error', 'never'],
      '@stylistic/js/wrap-iife': ['error', 'inside'],
      '@stylistic/js/wrap-regex': 'error',
      '@stylistic/js/yield-star-spacing': ['error', 'after'],
    },
  },
)
