module.exports = (sequelize, Sequelize) => {
  const bookmarkedSeries = sequelize.define("bookmarkedseries", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    series_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "series",
        key: "series_id",
      },
    },
    userid: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "userid",
      },
    },
   
    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });


 

  bookmarkedSeries
    .sync({alter:true})
    .then(() =>
      console.log(
        "...bs....bs....Bookmarked Series's Table Sync complete...bs......bs."
      )
    );


  return bookmarkedSeries;
};
