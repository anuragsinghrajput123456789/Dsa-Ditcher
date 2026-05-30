import Sheet from '../models/Sheet.js';

// @desc    Get all sheets for logged in user
// @route   GET /api/sheets
// @access  Private
export const getSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find({ user: req.user._id });
    res.json(sheets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a sheet
// @route   POST /api/sheets
// @access  Private
export const createSheet = async (req, res) => {
  const { title, description, problems } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  try {
    const sheet = await Sheet.create({
      user: req.user._id,
      title,
      description,
      problems: problems || "[]",
    });
    res.status(201).json(sheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a sheet
// @route   PUT /api/sheets/:id
// @access  Private
export const updateSheet = async (req, res) => {
  try {
    const sheet = await Sheet.findById(req.params.id);

    if (!sheet) {
      return res.status(404).json({ message: 'Sheet not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the sheet user
    if (sheet.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedSheet = await Sheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedSheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a sheet
// @route   DELETE /api/sheets/:id
// @access  Private
export const deleteSheet = async (req, res) => {
  try {
    const sheet = await Sheet.findById(req.params.id);

    if (!sheet) {
      return res.status(404).json({ message: 'Sheet not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the sheet user
    if (sheet.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await sheet.deleteOne();

    res.json({ id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
