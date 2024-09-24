tinymce.init({
    selector: 'textarea#my-expressjs-tinymce-app',
    plugins: 'lists link image table code help wordcount codesample',
    toolbar: 'codesample',
  codesample_languages: [
    {text: 'HTML/XML', value: 'markup'},
    {text: 'JavaScript', value: 'javascript'},
    {text: 'CSS', value: 'css'},
    {text: 'PHP', value: 'php'},
    {text: 'Python', value: 'python'},
    {text: 'Java', value: 'java'}
  ]
  });