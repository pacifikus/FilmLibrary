<template lang="pug">
    .content-wrapper
      section
        .container
          h1.ui-title-1 Home
          input(
            type="text"
            placeholder="What we will watch?"
            v-model="taskTitle"
            @keyup.enter="newTask"
          )
          textarea(
            type="text"
            v-model="taskDescription"
            @keyup.enter="newTask"
          )
          .option-list
            input.what-watch--radio(
              type="radio"
              id="radioFilm"
              value="Film"
              v-model="whatWatch"
            )
            label(
              for="radioFilm"
            ) Film
            input.what-watch--radio(
              type="radio"
              id="radioSerial"
              value="Serial"
              v-model="whatWatch"
            )
            label(
              for="radioSerial"
            ) Serial
          .total-time
            .total-time__film(
              v-if="whatWatch === 'Film'"
            )
              span.time-title Hours
              input.time-input(
                type="number"
                v-model="filmHours"
              )
              span.time-title Minutes
              input.time-input(
                type="number"
                v-model="filmMinutes"
              )
              p {{ filmTime }}

            .total-time__serial(
              v-if="whatWatch === 'Serial'"
            )
              span.time-title How many seasons?
              input.time-input(
                type="number"
                v-model="serialSeasons"
              )
              span.time-title How many series?
              input.time-input(
                type="number"
                v-model="serialSeries"
              )
              span.time-title How long is one episode? (minutes)
              input.time-input(
                type="number"
                v-model="serialSeriesMinutes"
              )
              p {{ serialTime }}

          .tag-list.tag-list--add
            .ui-tag__wrapper(
              @click="tagMenuShow = ! tagMenuShow"
            )
              .ui-tag
                span.tag-title Add new
                span.button-close(
                  :class="{ active: !tagMenuShow}"
                )

          transition(name="fade")
            .tag-list.tag-list--menu(
              v-if="tagMenuShow"
            )
              input.tag-add--input(
                type="text"
                placeholder="New tag"
                v-model="tagTitle"
                @keyup.enter="newTag"
              )
              .button.button-default(
                @click="newTag"
              ) Send

          .tag-list
            .ui-tag__wrapper(
              v-for="tag in tags"
              :key="tag.title"
            )
              .ui-tag(
                @click="addTagUsed(tag)"
                :class="{ used: tag.use}"
              )
                span.tag-title {{ tag.title }}

          .button-list
            .button.button--round.button-primary(
              @click="newTask"
            ) Send

</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      whatWatch: 'Film',
      filmHours: 1,
      filmMinutes: 30,
      serialSeasons: 1,
      serialSeries: 6,
      serialSeriesMinutes: 40,

      tagMenuShow: false,
      tagTitle: '',
      tagsUsed: []
    }
  },
  methods: {
    newTag () {
      if (this.tagTitle === '') {
        return
      }
      const tag = {
        title: this.tagTitle,
        use: false
      }
      this.$store.dispatch('newTag', tag)
    },
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      let time
      if (this.whatWatch === 'Film') {
        time = this.filmTime
      } else {
        time = this.serialTime
      }
      const task = (
        {
          title: this.taskTitle,
          description: this.taskDescription,
          whatWatch: this.whatWatch,
          time,
          tags: this.tagsUsed,
          completed: false,
          editing: false
        }
      )
      this.$store.dispatch('newTask', task)
      console.log(task)

      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = []

      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].use = false
      }
    },
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return hours + ' hours ' + min + ' minutes'
    },
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push(tag)
      } else {
        let index = this.tagsUsed.findIndex(item => item.title === tag.title)
        this.tagsUsed.splice(index, 1)
      }
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    },
    filmTime () {
      let min = this.filmHours * 60 + this.filmMinutes * 1
      return this.getHoursAndMinutes(min)
    },
    serialTime () {
      let min = this.serialSeasons * this.serialSeries * this.serialSeriesMinutes
      return this.getHoursAndMinutes(min)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .option-list
    display flex
    .what-watch--radio
      margin-right 12px
    label
      margin-right 20px
      &:last-child
        margin-right 0px

  .total-time
    margin-bottom 20px

  .time-title
    display block
    margin-bottom 6px

  .time-input
    max-width 80px
    margin-right 10px

  .tag-list
    margin-bottom 20px

  .ui-tag__wrapper
    margin-right 18px
    margin-bottom 10px
    &:last-child
      margin-right 0px

  .ui-tag
    &:hover
      cursor pointer
    .button-close
      &.active
        transform: rotate(45deg)
    &.used
      background-color: #444ce0
      color: #fff
      .button-close
        &:before
        &:after
          background-color: #fff

  .tag-list--menu
    display flex
    justify-content space-between
    align-items center

  .tag-add--input
    margin-bottom 0px
    margin-right 10px
    height 42px
</style>
