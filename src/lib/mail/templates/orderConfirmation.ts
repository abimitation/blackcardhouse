import tr from "@/messages/tr.json";
import en from "@/messages/en.json";
import { Currency } from "@/config/currencies";
import {
  MARKETPLACE_PACKAGES,
  MarketplacePackageId,
} from "@/config/marketplace";
import { ServiceId, services } from "@/config/services";
import { formatPrice } from "@/lib/utils";

export type OrderConfirmationMailTemplateProps = {
  amount: number;
  currency: Currency;
  cardNetwork?: string;
  cardNumber?: string;
  email: string;
  firstName: string;
  lastName: string;
  marketplacePackages: MarketplacePackageId[] | null;
  orderId: string;
  phone: string;
  transactionDate: string;
  transactionId: string;
  service: ServiceId | null;
  locale: "tr" | "en";
};

export const orderConfirmationMailTemplate = ({
  amount,
  currency,
  cardNetwork,
  cardNumber,
  email,
  firstName,
  lastName,
  marketplacePackages,
  orderId,
  phone,
  transactionDate,
  transactionId,
  service,
  locale,
}: OrderConfirmationMailTemplateProps) => {
  const selectedService = services.find((s) => s.id === service) ?? null;
  const allMarketplacePackages = Object.values(MARKETPLACE_PACKAGES).flat();
  const messages = (locale === "tr" ? tr : en) as any;
  const t = messages.OrderConfirmation;

  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="${locale}">
      <head>
        <link
          rel="preload"
          as="image"
          href="https://blackcardhouse.com/img/logo-96x96.png"
        />
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
        <!--$-->
      </head>
      <body
        style="
          background-color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        "
      >
        <div
          style="
            display: none;
            overflow: hidden;
            line-height: 1px;
            opacity: 0;
            max-height: 0;
            max-width: 0;
          "
        >
          ${t.header}
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
          style="max-width: 37.5em; margin: 0 auto; padding: 20px 0 48px"
        >
          <tbody>
            <tr style="width: 100%">
              <td>
                <img
                  alt="BlackCardHouse"
                  src="https://blackcardhouse.com/img/logo-96x96.png"
                  style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"
                  height="64"
                  width="64" />
                <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                  ${t.greeting.replace("{name}", `${firstName} ${lastName}`)}
                </p>
                <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                  ${t.thanks}
                </p>

                <table
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0px;
                    color: rgb(51, 51, 51);
                    background-color: rgb(250, 250, 250);
                    border-radius: 3px;
                    font-size: 12px;
                  "
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="height: 46px"
                        >
                          <tbody style="width: 100%">
                            <tr style="width: 100%">
                              <td colspan="2" data-id="__react-email-column">
                                <table
                                  align="center"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <table
                                          align="center"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                        >
                                          <tbody style="width: 100%">
                                            <tr style="width: 100%">
                                              <td
                                                data-id="__react-email-column"
                                                style="
                                                  padding-left: 20px;
                                                  border-style: solid;
                                                  border-color: white;
                                                  border-width: 0px 1px 1px 0px;
                                                  height: 44px;
                                                "
                                              >
                                                <p
                                                  style="
                                                    font-size: 10px;
                                                    line-height: 1.4;
                                                    margin: 0;
                                                    padding: 0;
                                                    color: rgb(102, 102, 102);
                                                  "
                                                >
                                                  ${t.transaction_date}
                                                </p>
                                                <p
                                                  style="
                                                    font-size: 12px;
                                                    line-height: 1.4;
                                                    margin: 0;
                                                    padding: 0;
                                                  "
                                                >
                                                  ${transactionDate}
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          align="center"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                        >
                                          <tbody style="width: 100%">
                                            <tr style="width: 100%">
                                              <td
                                                data-id="__react-email-column"
                                                style="
                                                  padding-left: 20px;
                                                  border-style: solid;
                                                  border-color: white;
                                                  border-width: 0px 1px 1px 0px;
                                                  height: 44px;
                                                "
                                              >
                                                <p
                                                  style="
                                                    font-size: 10px;
                                                    line-height: 1.4;
                                                    margin: 0;
                                                    padding: 0;
                                                    color: rgb(102, 102, 102);
                                                  "
                                                >
                                                  ${t.transaction_no}
                                                </p>
                                                <p
                                                  style="
                                                    font-size: 12px;
                                                    line-height: 1.4;
                                                    margin: 0;
                                                    padding: 0;
                                                  "
                                                >
                                                  ${transactionId}
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          align="center"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                        >
                                          <tbody style="width: 100%">
                                            <tr style="width: 100%">
                                              <td
                                                data-id="__react-email-column"
                                                style="
                                                  padding-left: 20px;
                                                  border-style: solid;
                                                  border-color: white;
                                                  border-width: 0px 1px 1px 0px;
                                                  height: 44px;
                                                "
                                              >
                                                <p
                                                  style="
                                                    font-size: 10px;
                                                    line-height: 1.4;
                                                    margin: 0;
                                                    padding: 0;
                                                    color: rgb(102, 102, 102);
                                                  "
                                                >
                                                  ${t.order_no}
                                                </p>
                                                <p
                                                  style="
                                                    font-size: 12px;
                                                    line-height: 1.4;
                                                    margin: 0;
                                                    padding: 0;
                                                  "
                                                >
                                                  ${orderId}
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td
                                colspan="2"
                                data-id="__react-email-column"
                                style="
                                  padding-left: 20px;
                                  border-style: solid;
                                  border-color: white;
                                  border-width: 0px 1px 1px 0px;
                                  height: 44px;
                                "
                              >
                                <p
                                  style="
                                    font-size: 10px;
                                    line-height: 1.4;
                                    margin: 0;
                                    padding: 0;
                                    color: rgb(102, 102, 102);
                                  "
                                >
                                  ${t.billed_to}
                                </p>
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 1.4;
                                    margin: 0;
                                    padding: 0;
                                    text-transform: uppercase;
                                  "
                                >
                                  ${cardNetwork ?? ""}
                                </p>
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 1.4;
                                    margin: 0;
                                    padding: 0;
                                  "
                                >
                                  ${cardNumber ?? ""}
                                </p>
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 1.4;
                                    margin: 0;
                                    padding: 0;
                                  "
                                >
                                  ${firstName} ${lastName}
                                </p>
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 1.4;
                                    margin: 0;
                                    padding: 0;
                                  "
                                >
                                  ${email}
                                </p>
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 1.4;
                                    margin: 0;
                                    padding: 0;
                                  "
                                >
                                  ${phone}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>

                ${marketplacePackages && marketplacePackages.length > 0
      ? `<table
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="margin: 30px 0 15px 0"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody style="width: 100%">
                          ${marketplacePackages
        .map((packageId) => {
          const pkg = allMarketplacePackages.find(
            (p) => p.id === packageId,
          );
          if (!pkg) return "";

          return `<tr style="width: 100%">
                              <td
                                data-id="__react-email-column"
                                style="width: 64px"
                              >
                                <img
                                  alt="Marketplace Package"
                                  height="32"
                                  src="https://blackcardhouse.com/img/service-64x64.png"
                                  style="
                                    display: block;
                                    outline: none;
                                    border: none;
                                    text-decoration: none;
                                    margin: 0 0 0 20px;
                                  "
                                  width="32"
                                />
                              </td>
                              <td data-id="__react-email-column">
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 1.4;
                                    margin: 0;
                                    font-weight: 600;
                                    padding: 0;
                                  "
                                >
                                  ${messages.MarketplaceItems[pkg.id as keyof typeof messages.MarketplaceItems]?.title ?? pkg.title}
                                </p>
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 1.4;
                                    margin: 0;
                                    color: rgb(102, 102, 102);
                                    padding: 0;
                                  "
                                >
                                  ${t.marketplace_package}
                                </p>
                              </td>
                              <td
                                align="right"
                                data-id="__react-email-column"
                                style="
                                  display: table-cell;
                                  padding: 0px 20px 0px 0px;
                                  width: 100px;
                                  vertical-align: top;
                                "
                              >
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 24px;
                                    margin: 0;
                                    font-weight: 600;
                                  "
                                >
                                  ${formatPrice(pkg.amount, currency, false)}
                                </p>
                              </td>
                            </tr>`;
        })
        .join("")}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                `
      : ""
    }

                ${selectedService
      ? `<table
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="margin: 30px 0 15px 0"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody style="width: 100%">
                            <tr style="width: 100%">
                              <td
                                data-id="__react-email-column"
                                style="width: 64px"
                              >
                                <img
                                  alt="Service"
                                  height="32"
                                  src="https://blackcardhouse.com/img/service-64x64.png"
                                  style="
                                    display: block;
                                    outline: none;
                                    border: none;
                                    text-decoration: none;
                                    margin: 0 0 0 20px;
                                  "
                                  width="32"
                                />
                              </td>
                              <td data-id="__react-email-column">
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 1.4;
                                    margin: 0;
                                    font-weight: 600;
                                    padding: 0;
                                  "
                                >
                                  ${messages.Services[selectedService.id as keyof typeof messages.Services]?.title ?? selectedService.title}
                                </p>
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 1.4;
                                    margin: 0;
                                    color: rgb(102, 102, 102);
                                    padding: 0;
                                  "
                                >
                                  ${t.service}
                                </p>
                              </td>
                              <td
                                align="right"
                                data-id="__react-email-column"
                                style="
                                  display: table-cell;
                                  padding: 0px 20px 0px 0px;
                                  width: 100px;
                                  vertical-align: top;
                                "
                              >
                                <p
                                  style="
                                    font-size: 12px;
                                    line-height: 24px;
                                    margin: 0;
                                    font-weight: 600;
                                  "
                                >
                                  ${formatPrice(amount, currency, false)}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                `
      : ""
    }

                <hr
                  style="
                    width: 100%;
                    border: none;
                    border-top: 1px solid #eaeaea;
                    margin: 30px 0 0 0;
                  "
                />
                <table
                  align="right"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tbody style="width: 100%">
                            <tr style="width: 100%">
                              <td
                                align="right"
                                data-id="__react-email-column"
                                style="display: table-cell"
                              >
                                <p
                                  style="
                                    font-size: 10px;
                                    line-height: 24px;
                                    margin: 0;
                                    color: rgb(102, 102, 102);
                                    font-weight: 600;
                                    padding: 0px 30px 0px 0px;
                                    text-align: right;
                                  "
                                >
                                  ${t.total}
                                </p>
                              </td>
                              <td
                                data-id="__react-email-column"
                                style="
                                  height: 48px;
                                  border-left: 1px solid #eaeaea;
                                "
                              ></td>
                              <td
                                data-id="__react-email-column"
                                style="display: table-cell; width: 90px"
                              >
                                <p
                                  style="
                                    font-size: 16px;
                                    line-height: 24px;
                                    margin: 0px 20px 0px 0px;
                                    font-weight: 600;
                                    white-space: nowrap;
                                    text-align: right;
                                  "
                                >
                                  ${formatPrice(amount, currency, false)}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr
                  style="
                    width: 100%;
                    border: none;
                    border-top: 1px solid #eaeaea;
                    margin: 0 0 30px 0;
                  "
                />

                <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                  ${t.unauthorized_info.replace("{email}", "info@blackcardhouse.com")}
                </p>
                <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                  ${t.regards},<br />${t.team}
                </p>
                <hr
                  style="
                    width: 100%;
                    border: none;
                    border-top: 1px solid #eaeaea;
                    border-color: #cccccc;
                    margin: 20px 0;
                  "
                />

                <p
                  style="
                    font-size: 12px;
                    line-height: 24px;
                    margin: 8px 0 0 0;
                    text-align: center;
                    color: rgb(102, 102, 102);
                  "
                >
                  <a
                    href="https://blackcardhouse.com/payment-policy"
                    style="color: #067df7; text-decoration-line: none"
                    target="_blank"
                    >${messages.Footer.payment}</a
                  >
                  <!-- -->•<!-- -->
                  <a
                    href="https://blackcardhouse.com/privacy-policy"
                    style="color: #067df7; text-decoration-line: none"
                    target="_blank"
                    >${messages.Footer.privacy}<!-- -->
                  </a>
                  <!-- -->•<!-- -->
                  <a
                    href="https://blackcardhouse.com/terms-of-service"
                    style="color: #067df7; text-decoration-line: none"
                    target="_blank"
                    >${messages.Footer.terms}</a
                  >
                  <!-- -->•<!-- -->
                  <a
                    href="https://blackcardhouse.com/refund-and-cancellation-policy"
                    style="color: #067df7; text-decoration-line: none"
                    target="_blank"
                    >${messages.Footer.refund}<!-- -->
                  </a>
                </p>
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
