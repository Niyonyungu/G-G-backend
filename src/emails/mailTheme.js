export const weddingTheme = {
    customCss: `
    .email-body { background-color: #f9f7f7; }
    .email-container { background-color: #ffffff; }
    .header { background-color: #A65D57; color: white; }
    .button { background-color: #A65D57; color: white; }
    .content-block { font-family: 'Georgia', serif; }
    h1, h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; }
    .role { color: #A65D57; font-weight: bold; text-transform: capitalize; }
   
    table.data-table {
      border-collapse: separate;
      border-spacing: 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    table.data-table tr:nth-child(even) {
      background-color: #f9f7f7;
    }
    table.data-table td {
      padding: 12px 15px;
      border-bottom: 1px solid #eee;
    }
    table.data-table tr:last-child td {
      border-bottom: none;
    }
    table.data-table td:first-child {
      font-weight: bold;
      color: #666;
    }
  `,
    htmlToText: true
};