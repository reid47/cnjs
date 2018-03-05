import { preprocess } from '../src/preprocess';
import { preprocess2 } from '../src/preprocess2';

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
    name: 'block comments',
    input: `
/*
 * Licensed under MIT (https://github.com/hello)
 */

    /* some comment
    that spans * multiple / lines
    some weird characters: & : / * !
    */

    color: red; /* hello */
    background: /* world */ green;
    `,
    output: ['.test{color:red;background:green;}']
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
    name: 'fancy selectors',
    input: `
      &[id="some-id"] {
        color: green;
      }

      [id="some-other-id"] {
        color: blue;
      }

      * {
        margin: 0;
      }

      &:not(.some-class):first-child {
        color: red;
      }

      &:not([disabled]) {
        color: purple;
      }
    `,
    output: [
      '.test[id="some-id"]{color:green;}',
      '.test [id="some-other-id"]{color:blue;}',
      '.test *{margin:0;}',
      '.test:not(.some-class):first-child{color:red;}',
      '.test:not([disabled]){color:purple;}'
    ]
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

      .child:before {
        color: yellow;
      }
    `,
    output: [
      '.test .some-child{color:blue;}',
      '.test > .immediate-child{color:purple;}',
      '.test .child1 .child2{color:green;}',
      '.test .child:before{color:yellow;}'
    ]
  },
  {
    name: 'merging identical selectors',
    input: `
      &.testing {
        color: blue;
      }

      &.testing {
        background: yellow;
        color: black;
      }
    `,
    output: ['.test.testing{color:blue;background:yellow;color:black;}']
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

      &.class-a {
        &.class-b {
          color: green;
        }
      }
    `,
    output: [
      '.wrapper .test{color:orange;}',
      '.test .container{color:teal;}',
      '.test .container .another-class{color:aquamarine;}',
      '.box button.test{color:purple;}',
      '.test.class-a.class-b{color:green;}'
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
    name: 'at-rules without braces',
    input: `
      @import 'global.css';

      @charset "UTF-8";
    `,
    output: ["@import 'global.css';", '@charset "UTF-8";']
  },
  {
    name: 'at-rules with braces',
    input: `
      @media screen and (max-width: 768px) {
        color: purple;
      }

      @page {
        size: A4 landscape;
      }

      @supports (color: red) {
        color: red;
      }

      @supports (color: red) {
        background: green;
      }

      @supports not (display: table-cell) and ((display: list-item) or (display:run-in)) {
        color: green;
      }

      @supports not (display: grid)
        and ((display: list-item)
          or (display:run-in)) {
        color: yellow;
      }
    `,
    output: [
      '@media screen and (max-width: 768px){.test{color:purple;}}',
      '@page{.test{size:A4 landscape;}}',
      '@supports (color: red){.test{color:red;background:green;}}',
      '@supports not (display: table-cell) and ((display: list-item) or (display:run-in)){.test{color:green;}}',
      '@supports not (display: grid) and ((display: list-item) or (display:run-in)){.test{color:yellow;}}'
    ]
  },
  {
    name: 'nested at-rules',
    input: `
      @supports (color: red) {
        @media (max-width: 768px) {
          color: red;
        }
      }

      @media print and (min-width: 200px) {
        color: purple;

        @supports (hello: world) {
          color: green;
        }

        @supports (test: this) {
          color: blue;
        }
      }

      @media (max-width: 768px) {
        &:hover {
          border-bottom: 2px solid purple;
        }
      }

      .some-class {
        @media only screen and (max-width: 800px) {
          color: yellow;
        }
      }
    `,
    output: [
      '@supports (color: red){@media (max-width: 768px){.test{color:red;}}}',
      '@media print and (min-width: 200px){.test{color:purple;}}',
      '@media print and (min-width: 200px){@supports (hello: world){.test{color:green;}}}',
      '@media print and (min-width: 200px){@supports (test: this){.test{color:blue;}}}',
      '@media (max-width: 768px){.test:hover{border-bottom:2px solid purple;}}',
      '@media only screen and (max-width: 800px){.test .some-class{color:yellow;}}'
    ]
  },
  {
    name: '* selectors',
    input: `
      *, *:before, *:after {
        color: yellow;
      }
    `,
    output: ['.test *,.test *:before,.test *:after{color:yellow;}']
  },
  {
    name: 'tricky parsing examples',
    input: `
      hello: world;
      hello2:world2;

      h1:before {
        nested:property;
      }

      linebreak:one, linebreak:two,
      linebreak:three {
        nested: again;
      }
    `,
    output: [
      '.test{hello:world;hello2:world2;}',
      '.test h1:before{nested:property;}',
      '.test linebreak:one,.test linebreak:two,.test linebreak:three{nested:again;}'
    ]
  }
];

// These next tests were borrowed almost directly from the Stylis
// tests, found below. Huge thanks to @thysultan for his work on Stylis:
// https://github.com/thysultan/stylis.js/blob/master/tests/spec.js
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
    expect(input.trim()).not.toBe('');
    expect(preprocess('.test', input)).toEqual(output);
  });
});
