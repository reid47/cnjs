import { preprocess } from '../src/preprocess';

const examples = [
  {
    name: 'top-level definitions',
    input: `
      font-size: 47px;
      color: purple;
    `,
    output: ['.test{font-size:47px;color:purple;}']
  },
  {
    name: 'line comments',
    input: `
      // this shouldn't appear
      font-size: 47px; // neither should this
      color: purple;
      // or this
    `,
    output: ['.test{font-size:47px;color:purple;}']
  },
  {
    name: 'same-level class names',
    input: `
      &.same-level {
        color: blue;
      }
    `,
    output: ['.test.same-level{color:blue;}']
  },
  {
    name: 'child class names',
    input: `
      & .some-child {
        color: blue;
      }

      & > .immediate-child {
        color: purple;
      }
    `,
    output: [
      '.test .some-child{color:blue;}',
      '.test > .immediate-child{color:purple;}'
    ]
  },
  {
    name: 'nesting &',
    input: `
      .wrapper & {
        color: orange;
      }

      .container {
        & {
          color: teal;
        }

        & .another-class {
          color: aquamarine;
        }
      }
    `,
    output: [
      '.wrapper .test{color:orange;}',
      '.container .test{color:teal;}',
      '.container .test.another-class{color:aquamarine;}'
    ]
  },
  {
    name: 'duplicating & selector',
    input: `
      & + & {
        color: blue;
      }
    `,
    output: ['.test + .test{color:blue;}']
  },
  {
    name: 'nesting with pseudoselectors',
    input: `
      &:hover {
        width: 100px;
        &:focus {
          &::placeholder {
            border-bottom: 10px solid black;
          }
        }
      }
    `,
    output: [
      '.test:hover{width:100px;}',
      '.test:hover:focus::placeholder{border-bottom:10px solid black;}'
    ]
  },
  {
    name: 'media queries',
    input: `
      @media (max-width: 100px) {
        color: red;
      }
    `,
    output: ['@media (max-width: 100px){.test{color:red;}}']
  }
];

examples.forEach(({ name, input, output }) => {
  test(name, () => {
    expect(preprocess('.test', input)).toEqual(output);
  });
});
