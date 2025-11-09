import express from 'express';
import Chat from '../models/Chat.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/chats
// @desc    Get all chats for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    console.log('📖 Fetching chats for user:', req.user._id);
    
    const chats = await Chat.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .select('title createdAt updatedAt messages');

    console.log('✅ Found', chats.length, 'chats');

    res.json({
      success: true,
      chats: chats.map(chat => ({
        id: chat._id,
        title: chat.title,
        messageCount: chat.messages.length,
        lastMessage: chat.messages[chat.messages.length - 1]?.text || '',
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt
      }))
    });
  } catch (error) {
    console.error('❌ Get chats error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/chats/:id
// @desc    Get single chat by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    console.log('📖 Fetching chat:', req.params.id);
    
    const chat = await Chat.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!chat) {
      console.error('❌ Chat not found:', req.params.id);
      return res.status(404).json({ error: 'Chat not found' });
    }

    console.log('✅ Chat found with', chat.messages.length, 'messages');

    res.json({
      success: true,
      chat: {
        id: chat._id,
        title: chat.title,
        messages: chat.messages,
        uploadedFiles: chat.uploadedFiles,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt
      }
    });
  } catch (error) {
    console.error('❌ Get chat error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/chats
// @desc    Create new chat
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, messages, uploadedFiles } = req.body;
    
    console.log('💾 Creating new chat:', {
      userId: req.user._id,
      title: title || 'New Conversation',
      messageCount: messages?.length || 0,
      fileCount: uploadedFiles?.length || 0
    });

    const chat = await Chat.create({
      userId: req.user._id,
      title: title || 'New Conversation',
      messages: messages || [],
      uploadedFiles: uploadedFiles || []
    });

    console.log('✅ Chat created successfully:', chat._id);

    res.status(201).json({
      success: true,
      chat: {
        id: chat._id,
        title: chat.title,
        messages: chat.messages,
        uploadedFiles: chat.uploadedFiles,
        createdAt: chat.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Create chat error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/chats/:id
// @desc    Update chat (add messages)
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { messages, title, uploadedFiles } = req.body;

    console.log('💾 Updating chat:', {
      chatId: req.params.id,
      messageCount: messages?.length || 0,
      hasTitle: !!title,
      fileCount: uploadedFiles?.length || 0
    });

    const chat = await Chat.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!chat) {
      console.error('❌ Chat not found:', req.params.id);
      return res.status(404).json({ error: 'Chat not found' });
    }

    if (messages) chat.messages = messages;
    if (title) chat.title = title;
    if (uploadedFiles !== undefined) chat.uploadedFiles = uploadedFiles;

    await chat.save();

    console.log('✅ Chat updated successfully:', req.params.id);

    res.json({
      success: true,
      chat: {
        id: chat._id,
        title: chat.title,
        messages: chat.messages,
        uploadedFiles: chat.uploadedFiles,
        updatedAt: chat.updatedAt
      }
    });
  } catch (error) {
    console.error('❌ Update chat error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/chats/:id
// @desc    Delete chat
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const chat = await Chat.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    await chat.deleteOne();

    res.json({
      success: true,
      message: 'Chat deleted successfully'
    });
  } catch (error) {
    console.error('Delete chat error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
