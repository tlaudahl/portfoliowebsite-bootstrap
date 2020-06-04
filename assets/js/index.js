let mailController = (function () {
  const data = {
    name: null,
    email: null,
    message: null,
  };
  let DOMstrings = {
    name: "#name",
    email: "#email",
    message: "#message",
    formButton: "#formButton",
  };
  const mailOptions = {
    from: `${data.email}`,
    to: "travis.laudahl@gmail.com",
    subject: "Portfolio Contact Form",
    text: `Name: ${data.name}, Email: ${data.email} \n ${data.message}`,
  };
  return {
    getDOMStrings: function () {
      return DOMstrings;
    },
    setMailOptions: function () {
      mailOptions.from = `${data.email}`;
      mailOptions.text = `Name: ${data.name}, Email: ${data.email} \n ${data.message}`;
    },
    getMailOptions: function () {
      return mailOptions;
    },
    setData: function (e) {
      const { id } = e;
      if (id === "name") {
        data.name = e.value;
        return data.name;
      } else if (id === "email") {
        data.email = e.value;
        return data.email;
      } else {
        data.message = e.value;
        return data.email;
      }
    },
    getInput: function () {
      return {
        name: document.querySelector(DOMstrings.name).value, // Will be either inc or exp,
        email: document.querySelector(DOMstrings.email).value,
        message: document.querySelector(DOMstrings.message).value,
      };
    },
    sendMessage: function () {
      fetch("https://nodemailer-backend.herokuapp.com/send", {
        method: "POST",
        body: mailOptions,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  };
})();

let controller = (function (mailCtrl, UICtrl) {
  let setupEventListeners = () => {
    let DOM = mailCtrl.getDOMStrings();
    document.querySelector("#formButton").addEventListener("click", (e) => {
      e.preventDefault();
      mailCtrl.setMailOptions();
      mailCtrl.sendMessage();
    });

    document.querySelector("#name").addEventListener("input", (e) => {
      mailCtrl.setData(e.target);
    });

    document.querySelector("#email").addEventListener("input", (e) => {
      mailCtrl.setData(e.target);
    });
    document.querySelector("#message").addEventListener("input", (e) => {
      mailCtrl.setData(e.target);
    });
  };

  return {
    init: function () {
      setupEventListeners();
    },
  };
})(mailController);

controller.init();
