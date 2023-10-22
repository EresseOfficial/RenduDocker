const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Importing Mongoose ODM

// Create an Express application
const app = express();

// Set the port to 3000
const port = 3000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Connect to the database
const dbURI = 'mongodb://root:reactproject@db:27017/react_docker_db?authSource=admin';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // If the connection is successful, display a message in the console
    .then((result) => console.log('Connected to database'))
    // Otherwise, display an error message
    .catch((err) => console.error(err));

// Model for a rule
const Rule = mongoose.model('Rule', new mongoose.Schema({
    title: String,
    description: String,
    likes: Number,
    dislikes: Number,
    tags: [String],
}));

// Get all rules
app.get('/api/rules', (req, res) => {
    Rule.find()
        // If the rules are found, return all of them as JSON
        .then((result) => {
            res.json(result);
        })
        // Otherwise, return an error
        .catch((err) => {
            res.status(500).json({ error: 'An internal error has occurred.' });
        });
});

// Test route if the server is working
app.get('/api/hello', (req, res) => {
    res.send('Hello World!');
});

// Get a specific rule by ID
app.post('/api/rules', (req, res) => {
    // Create a new rule
    const newRule = new Rule(req.body);
    // Save the new rule to the database
    newRule.save()
        // If the rule is saved successfully, return the new updated rule.
        .then((result) => {
            res.json({ message: 'Rule added.', newRuleId: result._id });
        })
        // Otherwise, return an error.
        .catch((err) => {
            res.status(500).json({ error: 'Can\'t add a rule.' });
        });
});

// Insert a new rule to the database
app.post('/api/rules', (req, res) => {
    const newRule = new Rule(req.body);
    // Save the new rule to the database
    newRule.save()
        // If the rule is saved successfully, return the new updated rule.
        .then((result) => {
            res.json({ message: 'Rule added.', newRuleId: result._id });
        })
        // Otherwise, return an error.
        .catch((err) => {
            res.status(500).json({ error: 'Can\'t add a rule.' });
        });
});

// Increase the number of "likes" for a specific rule to the database
app.post('/api/rules/:id/like', (req, res) => {
    const ruleId = req.params.id;

    // Find the rule by ID and increase the number of "likes" by one.
    Rule.findByIdAndUpdate(ruleId, { $inc: { likes: 1 } }, { new: true })
        .then((result) => {
            // If the rule is found and updated successfully, return the new updated rule.
            res.json({ message: 'Rule liked.', result });
        })
        // Otherwise, return an error.
        .catch((err) => {
            res.status(500).json({ error: 'Error liking rule.' });
        });
});

// Increase the number of "dislikes" for a specific rule
app.post('/api/rules/:id/dislike', (req, res) => {
    const ruleId = req.params.id;

    // Search the rule by ID and increase the number of "dislikes" by one.
    Rule.findByIdAndUpdate(ruleId, { $inc: { dislikes: 1 } }, { new: true })
        .then((result) => {
            // If the rule is found and updated successfully, return the new updated rule.
            res.json({ message: 'Rule disliked.', result });
        })
        // Otherwise, return an error.
        .catch((err) => {
            res.status(500).json({ error: 'Error disliking rule.' });
        });
});

// Delete a rule
app.delete('/api/rules/:id', (req, res) => {
    const ruleId = req.params.id;
    // Search the rule by ID and delete it.
    Rule.findByIdAndDelete(ruleId)
        .then((result) => {
            if (!result) {
                // If the rule is not found, return an error.
                return res.status(404).json({ error: 'Rule not found.' });
            } else {
                // If the rule is found and deleted successfully, return a success message.
                res.json({ message: 'Rule deleted' });
            }
        })
        // Otherwise, return an error.
        .catch((err) => {
            console.error('Error when deleting rule:', err); // Display the error in the console
            res.status(500).json({ error: 'Error when deleting rule.' });
        });
});

// Listen to port 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


