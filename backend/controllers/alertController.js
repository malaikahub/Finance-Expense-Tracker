

// Create alert
export const createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    res.status(201).json(alert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all alerts
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().populate("user");
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update alert
export const updateAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alert) return res.status(404).json({ error: "Alert not found" });
    res.json(alert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete alert
export const deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) return res.status(404).json({ error: "Alert not found" });
    res.json({ message: "Alert deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
