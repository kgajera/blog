const changeCase = require("change-case");

/**
 * Prompts for front matter metadata fields
 * https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog#markdown-front-matter
 *
 * @param {string} name
 */
const questions = (name) => [
  {
    type: "input",
    name: "title",
    message: "Title?",
    initial: changeCase.titleCase(changeCase.sentenceCase(name)),
  },
  {
    type: "input",
    name: "slug",
    message: "Slug?",
    initial: name,
  },
  {
    type: "input",
    name: "description",
    message: "Description?",
  },
  {
    type: "input",
    name: "tags",
    message: "Tags?",
  },
  {
    type: "input",
    name: "authors",
    message: "Authors?",
  },
  {
    type: "input",
    name: "image",
    message: "Image?",
  },
  {
    type: "input",
    name: "keywords",
    message: "Keywords?",
  },
  {
    type: "confirm",
    name: "draft",
    message: "Is draft?",
    initial: false,
  },
  {
    type: "confirm",
    name: "hide_table_of_contents",
    message: "Hide table of contents?",
    initial: false,
  },
];

module.exports = {
  prompt: async ({ prompter, args }) => {
    const frontMatterData = {
      ...args,
    };

    // Prompt for given questions and merge answers to frontMatterData
    const prompt = async (questions) => {
      const answers = await prompter.prompt(
        questions.filter((q) => args[q.name] === undefined)
      );
      Object.assign(frontMatterData, answers);
    };

    // If the required "name" argument was not given, prompt for it
    await prompt([
      {
        type: "input",
        name: "name",
        message: "Name?",
      },
    ]);

    // Only continue with front matter prompts if using "interactive" mode
    if (args.i === true || args.interactive === true) {
      await prompt(questions(frontMatterData.name));

      if (!frontMatterData.hide_table_of_contents) {
        await prompt([
          {
            type: "input",
            name: "toc_min_heading_level",
            message: "Table of contents min heading level?",
            initial: 2,
          },
          {
            type: "input",
            name: "toc_max_heading_level",
            message: "Table of contents max heading level?",
            initial: 3,
          },
        ]);
      }
    }

    return frontMatterData;
  },
};
