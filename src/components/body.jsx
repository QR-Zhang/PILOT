import React from 'react';
import { render } from 'react-dom';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
//import 'highlight.js/styles/base16/gruvbox-dark-hard.css';
// import 'highlight.js/styles/base16/github.css';
import 'highlight.js/styles/tokyo-night-dark.css';
// import 'highlight.js/styles/pojoaque.css';

import 'img-comparison-slider';

// for video slider
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons); // required for slider icons and components

// ---------------- CUSTOM RENDERER --------------------
const renderer = new marked.Renderer();

// UIKit-compatible table
renderer.table = (header, body) => {
  return `
    <div class="uk-overflow-auto uk-width-1-1">
      <table class="uk-table uk-table-small uk-text-small uk-table-divider">
        ${header} ${body}
      </table>
    </div>`;
};

// IMPORTANT: remove your original broken code renderer.
// Let marked-highlight handle syntax highlighting.
// Do NOT override renderer.code(), or highlight.js breaks.


// ---------------- MARKED CONFIG --------------------
marked.use(markedKatex({ throwOnError: false }));

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const valid = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language: valid }).value;
    },
  })
);

marked.use({ renderer });

// ---------------- CONTENT COMPONENT --------------------
class Content extends React.Component {
  render() {
    const { title, text, image } = this.props;

    if (title)
      return (
        <h2 className="uk-text-bold uk-margin-top uk-heading-line uk-text-center">
          <span>{title}</span>
        </h2>
      );

    if (text)
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(text),
          }}
        />
      );

    if (image)
      return (
        <img
          src={image}
          className="uk-align-center uk-responsive-width"
          alt=""
        />
      );

    return null;
  }
}

// // ---------------- BODY COMPONENT --------------------
// export default class Body extends React.Component {
//   render() {
//     const { body } = this.props;

//     return body ? (
//       <div className="uk-section">
//         {body.map((sub, idx) => (
//           <div key={idx}>
//             <Content title={sub.title} />
//             <Content image={sub.image} />
//             <Content text={sub.text} />
//           </div>
//         ))}
//       </div>
//     ) : null;
//   }
// }

// ---------------- GOOGLE DRIVE SLIDER --------------------
const GoogleDriveSlider = ({ videos }) => {
  useEffect(() => {
    // Initialize UIKit slider
    UIkit.slider(document.querySelectorAll('[uk-slider]'));
  }, [videos]);

  if (!videos || videos.length === 0) return null;

  return (
    <div uk-slider="finite: true">
      <div className="uk-position-relative uk-visible-toggle">
        <ul className="uk-slider-items uk-child-width-1-1 uk-child-width-1-2@m uk-grid">
          {videos.map((video, idx) => (
            <li key={idx}>
              <div className="publication-video">
                <iframe
                  src={`${video.src}?autoplay=1&mute=1`} 
                  width="480"
                  height="360"
                  allow="autoplay"
                  allowFullScreen
                  frameBorder="0"
                  title={`video-${idx}`}
                />
              </div>
            </li>
          ))}
        </ul>

        <a
          className="uk-position-center-left uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-previous
          uk-slider-item="previous"
        ></a>
        <a
          className="uk-position-center-right uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-next
          uk-slider-item="next"
        ></a>
      </div>
    </div>
  );
};

// ---------------- BODY COMPONENT --------------------
export default class Body extends React.Component {
  render() {
    const { body } = this.props;

    return body ? (
      <div className="uk-section">
        {body.map((sub, idx) => (
          <div key={idx}>
            <Content title={sub.title} />
            <Content image={sub.image} />
            <Content text={sub.text} />
            {sub.videos && <GoogleDriveSlider videos={sub.videos} />}
          </div>
        ))}
      </div>
    ) : null;
  }
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
