const logResponse = (type, message) => {
  const icon = {
    error: "❌",
    success: "✅",
    warning: "⚠️",
    notify: "🔔",
    info: "ℹ️",
  };
  console.log(`${icon[type]} ${message}`);
};

export default logResponse;
