import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    contributors: collection({
      label: 'Contributors',
      path: 'src/content/contributors/*/',
      slugField: 'name',
      entryLayout: 'form',
      columns: ['name', 'role'],
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        personalUrl: fields.url({
          label: 'Personal Page URL',
          validation: { isRequired: false },
        }),
        role: fields.text({
          label: 'Role',
          validation: { isRequired: false },
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
          validation: { isRequired: false },
        }),
      },
    }),
    workshops: collection({
      label: 'Workshops',
      path: 'src/content/workshops/*/',
      slugField: 'title',
      format: { contentField: 'notes' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({ name: { label: 'Workshop Title' } }),
        date: fields.date({ label: 'Workshop Date' }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
        }),
        colabUrl: fields.url({
          label: 'Colab Notebook URL',
          validation: { isRequired: false },
        }),
        slidesUrl: fields.url({
          label: 'Presentation Slides URL',
          validation: { isRequired: false },
        }),
        pythonCells: fields.array(
          fields.object({
            label: fields.text({
              label: 'Cell Label',
              validation: { isRequired: false },
            }),
            code: fields.text({
              label: 'Python Code',
              multiline: true,
            }),
          }),
          {
            label: 'Python Cells',
            itemLabel: (props) => props.fields.label.value || 'Python cell',
          }
        ),
        resources: fields.array(
          fields.object({
            label: fields.text({ label: 'Resource Label' }),
            url: fields.url({ label: 'Resource URL' }),
          }),
          {
            label: 'Additional Resources',
            itemLabel: (props) => props.fields.label.value || 'Resource',
          }
        ),
        contributors: fields.array(
          fields.relationship({
            label: 'Contributor',
            collection: 'contributors',
          }),
          {
            label: 'Contributors',
            itemLabel: (props) => props.value || 'Contributor',
          }
        ),
        notes: fields.markdoc({
          label: 'Workshop Notes',
        }),
      },
    }),
  },
});
