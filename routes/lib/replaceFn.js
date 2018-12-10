const replaceFn = ({ req, todolist }) => {
  if (!req || !req.body || !req.body.toedit) {
    // SN 10/12/2018. In a production application I'd want to log/handle these but it seems silly to throw an exception.
    // The empty array is returned as a reset state.
    new Error(
      "Parameter 'req' or is falsy or req does not have a 'body' property or there is no 'toedit' property on 'body'. "
    );
    return [];
  }

  if (!req.body.revision) {
    // SN 10/12/2018. In a production application I'd want to log/handle these but it seems silly to throw an exception.
    // The empty array is returned as a reset state.
    new Error("Parameter 'body' does not have property 'revision");
    return [];
  }

  if (!todolist || todolist.constructor !== Array) {
    // SN 10/12/2018. In a production application I'd want to log/handle these but it seems silly to throw an exception.
    // The empty array is returned as a reset state.
    new Error("Parameter 'todolist' is falsy, or is not an array.");
    return [];
  }

  const localEdit = req.body.toedit;
  const firstSection = todolist.slice(0, localEdit);
  const secondSection = todolist.slice(localEdit + 1, todolist.length);
  return [...firstSection, ...[req.body.revision], ...secondSection];
};

module.exports = replaceFn;
