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

      .child1 {
        .child2 {
          color: green;
        }
      }
    `,
    output: [
      '.test .some-child{color:blue;}',
      '.test > .immediate-child{color:purple;}',
      '.test .child1 .child2{color:green;}'
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

      .box button& {
        color: purple;
      }
    `,
    output: [
      '.wrapper .test{color:orange;}',
      '.test .container{color:teal;}',
      '.test .container .another-class{color:aquamarine;}',
      '.box button.test{color:purple;}'
    ]
  },
  {
    name: 'duplicating & selector',
    input: `
      & + & {
        color: blue;
      }

      &&& {
        color: teal;
      }
    `,
    output: ['.test + .test{color:blue;}', '.test.test.test{color:teal;}']
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
    // focused: 1,
    name: 'top-level media queries',
    input: `
      @media (max-width: 100px) {
        color: red;

        div {
          color: green;
          &:hover {
            color: yellow;
          }
        }
      }
    `,
    output: [
      '@media (max-width: 100px){.test{color:red;}.test div{color:green;}}.test div:hover{color:yellow;}}'
    ]
  }
  // {
  //   name: 'nested media queries',
  //   input: `
  //     &:hover {
  //       @media (max-width: 100px) {
  //         color: red;
  //       }
  //     }
  //   `,
  //   output: ['@media (max-width: 100px){.test:hover{color:red;}}']
  // }
];

const stylisTests = [
  {
    name: 'newlines within values',
    input: `
      height:calc( 100vh - 1px );
      height:calc(
                    100vh -
                        1px
                  );
    `,
    output: ['.test{height:calc( 100vh - 1px );height:calc( 100vh - 1px );}']
  },
  {
    name: 'multiple comma-separated selectors',
    input: `
      span, h1 {
        color: red;
      }
      h1, &:after, &:before {
        color: red;
      }
    `,
    output: [
      '.test span,.test h1{color:red;}',
      '.test h1,.test:after,.test:before{color:red;}'
    ]
  },
  {
    name: 'control characters',
    input: `
      content:"\f\0\v";
    `,
    output: ['.test{content:"\f\0\v";}']
  },
  {
    name: 'empty rules',
    input: `
      &:hover {

      }

      & .some-class {}

      .hmm {
        // just a comment in here
      }
    `,
    output: []
  }
];

examples.push(...stylisTests);

const anyFocused = examples.some(x => x.focused);
examples.forEach(({ name, input, output, focused }) => {
  if (anyFocused && !focused) return;

  test(name, () => {
    expect(preprocess('.test', input)).toEqual(output);
  });
});
