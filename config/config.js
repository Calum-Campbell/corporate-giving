var mongolab = process.env.MONGOLAB_URI;

module.exports = {
  'secret': 'jsonwebtokensaregreat',
  // 'database': 'mongodb://localhost:27017/cause-app'
  'database': mongolab
};