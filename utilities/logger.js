import getCurrentLine from "get-current-line";

export const logger = (variable, message) => {
  const { line } = getCurrentLine();
  console.log(`Line No. ${line}: ${variable} ${message}`);
};
