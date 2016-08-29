# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160828005100) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "heroes", force: :cascade do |t|
    t.integer  "overwatch_state_id"
    t.integer  "alpha_id"
    t.string   "name"
    t.string   "image_path"
    t.string   "category"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "matchup_charts", force: :cascade do |t|
    t.text     "url"
    t.float    "min"
    t.float    "max"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "matchups", force: :cascade do |t|
    t.integer  "matchup_chart_id"
    t.string   "hero"
    t.string   "opponent"
    t.float    "score"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "overwatch_states", force: :cascade do |t|
    t.text     "matchups"
    t.text     "matchups_showing_counters"
    t.text     "scaled_matchups_showing_counters"
    t.integer  "number_of_votes"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

end
