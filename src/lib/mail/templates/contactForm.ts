import { contactFormSchema } from "@/lib/validations";
import { z } from "zod";

export const contactFormMailTemplate = (
  data: z.infer<typeof contactFormSchema>,
) => {
  const { email, firstName, lastName, message, phone, subject } = data;

  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="tr">
      <head>
        <link
          rel="preload"
          as="image"
          href="https://blackcardhouse.com/img/logo-96x96.png" />
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
        <!--$-->
      </head>
      <body
        style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'>
        <div
          style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
          BlackCardHouse ile premium yaşam tarzı yönetimi.
          <div>
             ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
          </div>
        </div>
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
          <tbody>
            <tr style="width:100%">
              <td>
                <img
                  alt="BlackCardHouse"
                  src="https://blackcardhouse.com/img/logo-96x96.png"
                  style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"
                  height="64"
                  width="64" />
                <p style="font-size:16px;line-height:26px;margin:16px 0">
                  New contact form submission.
                </p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">
                  <span style="font-weight: 500">From:</span> ${firstName} ${lastName} (${email}; ${phone})<br />
                  <span style="font-weight: 500">Subject:</span> ${subject}<br />
                  <span style="font-weight: 500">Message:</span> ${message}
                </p>
                <hr
                  style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                <p
                  style="
                    font-size: 12px;
                    line-height: 24px;
                    margin: 25px 0 0 0;
                    text-align: center;
                    color: rgb(102, 102, 102);
                  "
                >
                  Dept 3965, 43 Owston Road, Carcroft, Doncaster, DN6 8DA, United Kingdom
                  <br />
                  Copyright © 2026 The Illustrious Company Limited <br />
                  All rights reserved
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <!--/$-->
      </body>
    </html>
  `;
};
