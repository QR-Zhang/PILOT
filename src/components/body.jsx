import React from 'react';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';

import 'highlight.js/styles/tokyo-night-dark.css';
import 'img-comparison-slider';

// Configure Markdown
marked.use(markedKatex({ throwOnError: false }));
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language: validLang }).value;
    },
  })
);

// Custom table renderer (UIKit)
marked.use({
  renderer: {
    table(header, body) {
      return `
        <div class="uk-overflow-auto uk-width-1-1">
          <table class="uk-table uk-table-small uk-text-small uk-table-divider">
            ${header}
            ${body}
          </table>
        </div>
      `;
    },
  },
});

// Subsection Component
const Subsection = ({ title, image, text }) => (
  <div className="uk-margin-large">
    {title && (
      <h2 className="uk-text-bold uk-margin-top uk-heading-line uk-text-center">
        <span>{title}</span>
      </h2>
    )}

    {image && (
      <img
        src={image}
        className="uk-align-center uk-responsive-width"
        alt=""
      />
    )}

    {text && (
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(text)),
        }}
      />
    )}
  </div>
);

// Main Body Component
export default function Body({ body }) {
  if (!body) return null;

  return (
    <div className="uk-section">
      {body.map((s, idx) => (
        <Subsection key={idx} title={s.title} image={s.image} text={s.text} />
      ))}
    </div>
  );
}


// import React from 'react';
// import { render } from 'react-dom';
// import { marked } from 'marked';
// import markedKatex from 'marked-katex-extension';
// import { markedHighlight } from 'marked-highlight';
// import hljs from 'highlight.js';
// //import 'highlight.js/styles/base16/gruvbox-dark-hard.css';
// // import 'highlight.js/styles/base16/github.css';
// import 'highlight.js/styles/tokyo-night-dark.css';
// // import 'highlight.js/styles/pojoaque.css';

// import 'img-comparison-slider';

// const renderer = new marked.Renderer();
// renderer.table = (header, body) => {
//   return `<div class="uk-overflow-auto uk-width-1-1"><table class="uk-table uk-table-small uk-text-small uk-table-divider"> ${header} ${body} </table></div>`;
// };
// renderer.code = (code, language) => {
//   return `<pre class="hljs"><code class="hljs language-${language}">${code}</code></pre>`;
// };

// marked.use(markedKatex({ throwOnError: false }));
// marked.use(
//   markedHighlight({
//     emptyLangClass: 'hljs',
//     langPrefix: 'hljs language-',
//     highlight(code, lang) {
//       const language = hljs.getLanguage(lang) ? lang : 'plaintext';
//       return hljs.highlight(code, { language }).value;
//     },
//   })
// );
// marked.use({ renderer: renderer });

// class Content extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     if (this.props.title)
//       return (
//         <h2 className="uk-text-bold uk-margin-top uk-heading-line uk-text-center">
//           <span>{this.props.title}</span>
//         </h2>
//       );
//     if (this.props.text)
//       return (
//         <div
//           dangerouslySetInnerHTML={{ __html: marked.parse(this.props.text) }}
//         />
//       );
//     if (this.props.image)
//       return (
//         <img
//           src={`${this.props.image}`}
//           className="uk-align-center uk-responsive-width"
//           alt=""
//         />
//       );
//     return null;
//   }
// }

// export default class Body extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return this.props.body ? (
//       <div className="uk-section">
//         {this.props.body.map((subsection, idx) => {
//           return (
//             <div key={'subsection-' + idx}>
//               <Content title={subsection.title} />
//               <Content image={subsection.image} />
//               <Content text={subsection.text} />
//             </div>
//           );
//         })}
//       </div>
//     ) : null;
//   }
// }
