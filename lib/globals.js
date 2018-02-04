Stuffs = new Mongo.Collection('stuffs');

StuffsSchema = new SimpleSchema({
  'name': {
    type: String,
    label: 'Name'
  },
  'owner': {
    type: String,
    label: 'Owner UserId'
  },
  'interviewee': {
    type: String,
    label: 'Interviewee (username)'
  },
  'created': {
    type: Date,
    label: 'Creation date',
    denyUpdate: true,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  },
  'transcript': {
    type: String,
    label: 'Transcript'
  },
});

Stuffs.attachSchema(StuffsSchema);

export default Stuffs;
