# portfolio website

My personal portfolio website

## goals

- responsive web design
- clear structure
- discreet non distracting effects
- visual appealing
- should work with JavaScript disabled
- should be easy to maintain
- must work on mobile touch devices
- must provide a contact form
- should offer basic spam protection
- must provide the reqired legal notes

## dependencies

HTML, CSS, Vanilla JS, no libraries, no frameworks.
A PHP enabled web server is needed for the mail endpoint.

## installation

Change the lines 

`$recipient = 'contact@your-mail.xyz';` in the file `php/mail.php`,

`echo '<p align="center"><a href="https://your-website.xyz/index.html"><br>Please click ...` in the file `php/mail.php`,

`<p>Get in touch via the form below, or emailing <a class="email-link" href="mailto:contact@your-mail.xyz">contact@your-mail.xyz</a></p> ` in the file `index.html`,


according to your needs.
 
Also replace texts, logo and pictures by your own content then,
just copy the project's files / folders to your php enabled web server.
