const { Mailer } = require("./mailer");

class OTPMailer extends Mailer {
  constructor(to, code) {
    super();

    this.mailOptions = {
      to,
      subject: "[Super Pay] Código de verificación",
      html: this.buildHTML(to, code),
      ...this.mailOptions,
    };
  }

  buildHTML(to, code) {
    return `
    <div style="word-spacing: normal; background-color: #efefef">
    <div class="adM"></div>
    <div style="background-color: #efefef">
      <div class="adM"></div>
      <div style="margin: 0px auto; max-width: 600px">
        <div class="adM"></div>
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 0 0 0 0;
                  padding-bottom: 0;
                  padding-left: 0;
                  padding-right: 0;
                  padding-top: 0;
                  text-align: center;
                "
              >
                <div style="margin: 0px auto; max-width: 600px">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 0 0 0 0;
                            padding-bottom: 0;
                            padding-left: 0;
                            padding-right: 0;
                            padding-top: 0;
                            text-align: center;
                          "
                        >
                          <div
                            class="m_-7407310497223386214mj-column-per-100"
                            style="
                              font-size: 0px;
                              text-align: left;
                              direction: ltr;
                              display: inline-block;
                              vertical-align: top;
                              width: 100%;
                            "
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="vertical-align: top"
                              width="100%"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 0 0 0 0;
                                      padding-top: 0;
                                      padding-right: 0;
                                      padding-bottom: 0;
                                      padding-left: 0;
                                      word-break: break-word;
                                    "
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        min-width: 100%;
                                        max-width: 100%;
                                        width: 100px;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div
                                              style="
                                                border: 0;
                                                display: flex;
                                                outline: none;
                                                text-decoration: none;
                                                height: 6em;
                                                min-width: 100%;
                                                width: 100%;
                                                max-width: 100%;
                                                font-size: 13px;
                                                background-color: #151031;
                                                align-items: center;
                                              "
                                              width="100"
                                              class="CToWUd"
                                            >
                                              <span
                                                style="
                                                  color: #fffdf0;
                                                  font-family: BinancePlex,
                                                    Arial, PingFangSC-Regular,
                                                    'Microsoft YaHei',
                                                    sans-serif;
                                                  font-size: 20px;
                                                  font-weight: bold;
                                                  margin-left: auto;
                                                  margin-right: auto;
                                                "
                                                >Super Pay</span
                                              >
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style="
          background: #ffffff;
          background-color: #ffffff;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #ffffff; background-color: #ffffff; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 5px 5px 5px 5px;
                  text-align: center;
                "
              >
                <div style="margin: 0px auto; max-width: 590px">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 5px 5px 5px 5px;
                            text-align: center;
                          "
                        >
                          <div
                            class="m_-7407310497223386214mj-column-per-100"
                            style="
                              font-size: 0px;
                              text-align: left;
                              direction: ltr;
                              display: inline-block;
                              vertical-align: top;
                              width: 100%;
                            "
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="vertical-align: top"
                              width="100%"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 5px 5px 10px 5px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: BinancePlex, Arial,
                                          PingFangSC-Regular,
                                          'Microsoft YaHei', sans-serif;
                                        font-size: 20px;
                                        font-weight: 900;
                                        line-height: 25px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                    >
                                      Hola ${to},&nbsp;
                                      Tu código de verificación es:
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 5px 10px 5px;
                                      word-break: break-word;
                                    "
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        border-collapse: separate;
                                        line-height: 100%;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            bgcolor="#FCD535"
                                            role="presentation"
                                            style="
                                              border: none;
                                              border-radius: 3px;
                                              background: #fcd535;
                                            "
                                            valign="middle"
                                          >
                                            <div
                                              style="
                                                display: inline-block;
                                                background: #a194ff;
                                                color: #221055;
                                                font-family: BinancePlex,
                                                  Arial, PingFangSC-Regular,
                                                  'Microsoft YaHei',
                                                  sans-serif;
                                                font-size: 22px;
                                                font-weight: 900;
                                                line-height: 15px;
                                                margin: 0;
                                                text-decoration: none;
                                                text-transform: none;
                                                padding: 14px 25px;
                                                border-radius: 3px;
                                              "
                                            >
                                              ${code}
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      background: #ffffff;
                                      font-size: 0px;
                                      padding: 5px 5px 5px 5px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: BinancePlex, Arial,
                                          PingFangSC-Regular,
                                          'Microsoft YaHei', sans-serif;
                                        font-size: 14px;
                                        line-height: 20px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                    >
                                      <div>
                                        Solo necesitamos verificar su
                                        dirección de correo electrónico antes
                                        de que pueda acceder a la Super App®.
                                        Copie el código de verificación y vaya
                                        al link:
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 5px 10px 5px;
                                      word-break: break-word;
                                    "
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        border-collapse: separate;
                                        line-height: 100%;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            bgcolor="#FCD535"
                                            role="presentation"
                                            style="
                                              border: none;
                                              border-radius: 3px;
                                              background: #8135fc;
                                            "
                                            valign="middle"
                                          >
                                            <a
                                              href="https://dev.moneyapp.pro/auth/verify-email?email=${to}"
                                              style="
                                                display: inline-block;
                                                background: #d0c4ff;
                                                color: #371f7e;
                                                font-family: BinancePlex,
                                                  Arial, PingFangSC-Regular,
                                                  'Microsoft YaHei',
                                                  sans-serif;
                                                font-size: 14px;
                                                font-weight: 900;
                                                line-height: 15px;
                                                margin: 0;
                                                text-decoration: none;
                                                text-transform: none;
                                                padding: 10px 25px;
                                                border-radius: 3px;
                                              "
                                              target="_blank"
                                            >
                                              Verificar mi correo electrónico
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 5px 5px 5px 5px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: BinancePlex, Arial,
                                          PingFangSC-Regular,
                                          'Microsoft YaHei', sans-serif;
                                        font-size: 14px;
                                        line-height: 20px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                    >
                                      <div>
                                        ¿No reconoces esta actividad? No hay
                                        problema. Puede ignorar este correo.
                                        &nbsp;
                                      </div>
                                      <div>
                                        <br />
                                      </div>
                                      <i
                                        >Este es un mensaje automático, por
                                        favor no lo responda.&nbsp;</i
                                      >
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style="
          background: #ffffff;
          background-color: #ffffff;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #ffffff; background-color: #ffffff; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  border: 0 none rgb(0, 0, 0);
                  direction: ltr;
                  font-size: 0px;
                  padding: 5px 5px 5px 5px;
                  text-align: center;
                "
              >
                <div style="margin: 0px auto; max-width: 590px">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 5px 5px 5px 5px;
                            text-align: center;
                          "
                        >
                          <div
                            class="m_-7407310497223386214mj-column-per-100"
                            style="
                              font-size: 0px;
                              text-align: left;
                              direction: ltr;
                              display: inline-block;
                              vertical-align: top;
                              width: 100%;
                            "
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="vertical-align: top"
                              width="100%"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 5px 5px 5px 5px;
                                      word-break: break-word;
                                    "
                                  >
                                    <p
                                      style="
                                        border-top: solid 1px #6a0bf0;
                                        font-size: 1px;
                                        margin: 0px auto;
                                        width: 100%;
                                      "
                                    ></p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 5px 5px 5px 5px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: BinancePlex, Arial,
                                          PingFangSC-Regular,
                                          'Microsoft YaHei', sans-serif;
                                        font-size: 14px;
                                        font-weight: 900;
                                        line-height: 20px;
                                        text-align: center;
                                        color: #3b06c1;
                                      "
                                    >
                                      <span>¡Mantente conectado!</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="m_-7407310497223386214mj-group-full-width"
                                    style="
                                      font-size: 0px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      class="m_-7407310497223386214mj-column-per-25 m_-7407310497223386214mj-group-full-width"
                                      style="
                                        font-size: 0;
                                        line-height: 0;
                                        text-align: left;
                                        display: inline-block;
                                        width: 100%;
                                        direction: ltr;
                                      "
                                    >
                                      <div
                                        class="m_-7407310497223386214mj-column-per-100"
                                        style="
                                          font-size: 0px;
                                          text-align: left;
                                          direction: ltr;
                                          display: inline-block;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="vertical-align: top"
                                          width="100%"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  font-size: 0px;
                                                  padding: 5px 5px 5px 5px;
                                                  word-break: break-word;
                                                "
                                              >
                                                <table
                                                  align="center"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  style="
                                                    float: none;
                                                    display: inline-table;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 4px;
                                                          vertical-align: middle;
                                                        "
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          role="presentation"
                                                          style="
                                                            border-radius: 3px;
                                                            width: 20px;
                                                          "
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    5px;
                                                                  font-size: 0;
                                                                  height: 20px;
                                                                  vertical-align: middle;
                                                                  width: 20px;
                                                                "
                                                              >
                                                                <a
                                                                  href="#"
                                                                  target="_blank"
                                                                >
                                                                  <img
                                                                    height="20"
                                                                    src="https://ci6.googleusercontent.com/proxy/i6_VaF0YwcVX_aJGyTOdQcAoiGIJ_mtdJQgm675mrryBk89nw5L1n4IGp6-zyvdtnmx514a7q77HjvKPAZUNs8_TzAW1yho5wFRdDZM=s0-d-e1-ft#https://public.bnbstatic.com/image/social/twitter-dark.png"
                                                                    style="
                                                                      border-radius: 3px;
                                                                      display: block;
                                                                    "
                                                                    width="20"
                                                                    class="CToWUd"
                                                                  />
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <table
                                                  align="center"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  style="
                                                    float: none;
                                                    display: inline-table;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 4px;
                                                          vertical-align: middle;
                                                        "
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          role="presentation"
                                                          style="
                                                            border-radius: 3px;
                                                            width: 20px;
                                                          "
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    5px;
                                                                  font-size: 0;
                                                                  height: 20px;
                                                                  vertical-align: middle;
                                                                  width: 20px;
                                                                "
                                                              >
                                                                <a
                                                                  href="#"
                                                                  target="_blank"
                                                                >
                                                                  <img
                                                                    height="20"
                                                                    src="https://ci4.googleusercontent.com/proxy/U53_0poSUhgXl45ocVoVTFgWvEOvravIvtxHr-vzhkqVjYsVka73iN7LEUcP2xGzuMNmWoR829nTlGkKEG4p3ai_sXwFkBZo4tr7PW2S=s0-d-e1-ft#https://public.bnbstatic.com/image/social/telegram-dark.png"
                                                                    style="
                                                                      border-radius: 3px;
                                                                      display: block;
                                                                    "
                                                                    width="20"
                                                                    class="CToWUd"
                                                                  />
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <table
                                                  align="center"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  style="
                                                    float: none;
                                                    display: inline-table;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 4px;
                                                          vertical-align: middle;
                                                        "
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          role="presentation"
                                                          style="
                                                            border-radius: 3px;
                                                            width: 20px;
                                                          "
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    5px;
                                                                  font-size: 0;
                                                                  height: 20px;
                                                                  vertical-align: middle;
                                                                  width: 20px;
                                                                "
                                                              >
                                                                <a
                                                                  href="#"
                                                                  target="_blank"
                                                                >
                                                                  <img
                                                                    height="20"
                                                                    src="https://ci6.googleusercontent.com/proxy/K6Au7993Q2fgl7k4U2BfHoRxbKZ94Mp-OlW0bqQeI8JIkHW7FYUkOOgF-a5FFVJPgtgrK4pW9BGX0-aIDXY3wucgJiIwVbIxc7B2Nf_C=s0-d-e1-ft#https://public.bnbstatic.com/image/social/facebook-dark.png"
                                                                    style="
                                                                      border-radius: 3px;
                                                                      display: block;
                                                                    "
                                                                    width="20"
                                                                    class="CToWUd"
                                                                  />
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <table
                                                  align="center"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  style="
                                                    float: none;
                                                    display: inline-table;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 4px;
                                                          vertical-align: middle;
                                                        "
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          role="presentation"
                                                          style="
                                                            border-radius: 3px;
                                                            width: 20px;
                                                          "
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    5px;
                                                                  font-size: 0;
                                                                  height: 20px;
                                                                  vertical-align: middle;
                                                                  width: 20px;
                                                                "
                                                              >
                                                                <a
                                                                  href="#"
                                                                  target="_blank"
                                                                >
                                                                  <img
                                                                    height="20"
                                                                    src="https://ci4.googleusercontent.com/proxy/bTYvt7pFkMe655Q1Cpk5ZDxY8IHQsiISq-Twa3eeabEQJkGiPqa4ODw3BD39npl114xEvQBbQLYbT7tEC2HImm8jeEO77T8OmjHio3US=s0-d-e1-ft#https://public.bnbstatic.com/image/social/linkedin-dark.png"
                                                                    style="
                                                                      border-radius: 3px;
                                                                      display: block;
                                                                    "
                                                                    width="20"
                                                                    class="CToWUd"
                                                                  />
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <table
                                                  align="center"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  style="
                                                    float: none;
                                                    display: inline-table;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 4px;
                                                          vertical-align: middle;
                                                        "
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          role="presentation"
                                                          style="
                                                            border-radius: 3px;
                                                            width: 20px;
                                                          "
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    5px;
                                                                  font-size: 0;
                                                                  height: 20px;
                                                                  vertical-align: middle;
                                                                  width: 20px;
                                                                "
                                                              >
                                                                <a
                                                                  href="#"
                                                                  target="_blank"
                                                                >
                                                                  <img
                                                                    height="20"
                                                                    src="https://ci5.googleusercontent.com/proxy/JV337qEmHSlU3zvEhfhrFzW1ZJzNtMs08ZywZMo6i40ZAihSFETYkh6fnGpabTG34TI3l355s7YT7tejg2JU4SOlTOgm5FrNEGxrggc=s0-d-e1-ft#https://public.bnbstatic.com/image/social/youtube-dark.png"
                                                                    style="
                                                                      border-radius: 3px;
                                                                      display: block;
                                                                    "
                                                                    width="20"
                                                                    class="CToWUd"
                                                                  />
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <table
                                                  align="center"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  style="
                                                    float: none;
                                                    display: inline-table;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 4px;
                                                          vertical-align: middle;
                                                        "
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          role="presentation"
                                                          style="
                                                            border-radius: 3px;
                                                            width: 20px;
                                                          "
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    5px;
                                                                  font-size: 0;
                                                                  height: 20px;
                                                                  vertical-align: middle;
                                                                  width: 20px;
                                                                "
                                                              >
                                                                <a
                                                                  href="#"
                                                                  target="_blank"
                                                                >
                                                                  <img
                                                                    height="20"
                                                                    src="https://ci5.googleusercontent.com/proxy/FYRdyvm0TjFn07YlDlnI8_DXv-gGSM_s00effHNEygHvRJJAVQR8iYz0Azcuwv2aZIYgSgXWbtzyGp4lfh4vi8RJ2PS0ortX6EtM8w=s0-d-e1-ft#https://public.bnbstatic.com/image/social/reddit-dark.png"
                                                                    style="
                                                                      border-radius: 3px;
                                                                      display: block;
                                                                    "
                                                                    width="20"
                                                                    class="CToWUd"
                                                                  />
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <table
                                                  align="center"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  style="
                                                    float: none;
                                                    display: inline-table;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 4px;
                                                          vertical-align: middle;
                                                        "
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          role="presentation"
                                                          style="
                                                            border-radius: 3px;
                                                            width: 20px;
                                                          "
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    5px;
                                                                  font-size: 0;
                                                                  height: 20px;
                                                                  vertical-align: middle;
                                                                  width: 20px;
                                                                "
                                                              >
                                                                <a
                                                                  href="#"
                                                                  target="_blank"
                                                                >
                                                                  <img
                                                                    height="20"
                                                                    src="https://ci5.googleusercontent.com/proxy/WMuzzJSKIHAQ_iPy4fuaxQDIhIaLPfE5V9uy6uAbJWQe33Rlu9fIl6NLZBUeLv8HPgrylVnI3Ng0-9449OS5PJIJRVPvcnxLAJW-zYuWXQ=s0-d-e1-ft#https://public.bnbstatic.com/image/social/instagram-dark.png"
                                                                    style="
                                                                      border-radius: 3px;
                                                                      display: block;
                                                                    "
                                                                    width="20"
                                                                    class="CToWUd"
                                                                  />
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                class="m_-7407310497223386214mj-group-full-width"
                                                style="
                                                  font-size: 0px;
                                                  word-break: break-word;
                                                "
                                              >
                                                <div
                                                  class="m_-7407310497223386214mj-column-per-50 m_-7407310497223386214mj-group-full-width"
                                                  style="
                                                    font-size: 0;
                                                    line-height: 0;
                                                    text-align: left;
                                                    display: inline-block;
                                                    width: 100%;
                                                    direction: ltr;
                                                  "
                                                >
                                                  <div
                                                    class="m_-7407310497223386214mj-column-per-50"
                                                    style="
                                                      font-size: 0px;
                                                      text-align: left;
                                                      direction: ltr;
                                                      display: inline-block;
                                                      vertical-align: top;
                                                      width: 50%;
                                                    "
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="
                                                        vertical-align: top;
                                                      "
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="left"
                                                            style="
                                                              font-size: 0px;
                                                              padding: 5px 5px
                                                                5px 5px;
                                                              word-break: break-word;
                                                            "
                                                          >
                                                            <div
                                                              style="
                                                                font-family: BinancePlex,
                                                                  Arial,
                                                                  PingFangSC-Regular,
                                                                  'Microsoft YaHei',
                                                                  sans-serif;
                                                                font-size: 11px;
                                                                line-height: 20px;
                                                                text-align: left;
                                                                color: #000000;
                                                              "
                                                            >
                                                              <span
                                                                id="m_-7407310497223386214ipunt"
                                                                >Para
                                                                mantenerte
                                                                seguro,
                                                                configura tu
                                                                código anti
                                                                phishing
                                                              </span>
                                                              <a
                                                                href="#"
                                                                id="m_-7407310497223386214ijvlnl"
                                                                style="
                                                                  font-family: BinancePlex,
                                                                    Arial,
                                                                    PingFangSC-Regular,
                                                                    'Microsoft YaHei',
                                                                    sans-serif;
                                                                  color: #500bf0;
                                                                "
                                                                target="_blank"                                                                
                                                                >Aquí</a
                                                              >
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 5px 5px 5px 5px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: BinancePlex, Arial,
                                          PingFangSC-Regular,
                                          'Microsoft YaHei', sans-serif;
                                        font-size: 11px;
                                        line-height: 15px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                    >
                                      <div>
                                      <div>
                                        <b>Kindly note: </b> Please be aware
                                        of phishing sites and always make sure
                                        you are visiting the official
                                        Moneyapp.pro website when entering
                                        sensitive data.
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style="margin: 0px auto; max-width: 590px">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 5px 5px 5px 5px;
                            text-align: center;
                          "
                        >
                          <div
                            class="m_-7407310497223386214mj-column-per-100"
                            style="
                              font-size: 0px;
                              text-align: left;
                              direction: ltr;
                              display: inline-block;
                              vertical-align: top;
                              width: 100%;
                            "
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="vertical-align: top"
                              width="100%"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 5px 5px 5px 5px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: BinancePlex, Arial,
                                          PingFangSC-Regular,
                                          'Microsoft YaHei', sans-serif;
                                        font-size: 11px;
                                        line-height: 15px;
                                        text-align: center;
                                        color: #000000;
                                      "
                                    >
                                      © 2022 Money App, All Rights
                                      Reserved.
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="yj6qo"></div>
        <div class="adL"></div>
      </div>
      <div class="adL"></div>
    </div>
    <div class="adL"></div>
  </div>
        `;
  }
}

module.exports = { OTPMailer };
