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
    label: 'Transcript',
    optional: true,
    defaultValue: 'Hi, my name is Ludo. I guess that one of my weakness is that I was unable to complete the Hackathon in time.'
  },
});

Stuffs.attachSchema(StuffsSchema);

export default Stuffs;
