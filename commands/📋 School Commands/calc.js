const utils = require("../../utils");

const math = require("math-expression-evaluator");
const stripIndents = require("common-tags").stripIndents;
module.exports = {
  name: "calc",
  category: "📋 School Commands",
  description: "Calculate a mathematical equation",
  usage: "calc <operation>",
  run: async (client, message, args) => {
    //command

    if (args.length < 1)
      return message.reply(
        `You must provide an equation to solve on the calculator`
      );

    const question = args.join(" ");

    let answer;
    if (question.indexOf("9 + 10") > -1) {
      answer = "21";
    } else {
      try {
        answer = math.eval(question);
      } catch (err) {
        message.channel.send(`Invalid mathematical equation: ${err}`);
      }
    }

    message.channel.send({
      embed: utils.embed(
        "",
        stripIndents`
  **Equation:**\n\`\`\`\n${question}\n\`\`\`
  **Answer:**\n\`\`\`\n${answer}\n\`\`\`
  `
      ),
    });
  },
};
