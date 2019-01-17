{%- extends "apostrophe-modal:base.html" -%}
{%- import "apostrophe-modal:macros.html" as modals -%}
{%- import "apostrophe-ui:components/buttons.html" as buttons with context -%}

{%- block modalClass -%}
  {{ 'apos-workflow-committable-modal' | css }} apos-ui-modal-no-sidebar
{%- endblock -%}

{%- block controls -%}
  {{ buttons.minor('Done', { action: 'cancel' }) }}
{%- endblock -%}

{%- block label -%}
  {{ __('All Committable Documents') }}
{%- endblock -%}

{% block instructions %}
  <p>
    {{ __('Use the buttons provided to commit, revert or visit each document, or "Commmit All."') }}
  </p>
{% endblock %}

{%- block body -%}
  <div class="apos-manage-view" data-apos-manage-view="" data-apos-workflow-list>
    <div class="apos-table">
      <table data-items class="apos-manage-table">
        <thead data-headings>
          <tr>
            <th class="apos-manage-column">{{ __('Document') }}</th>
            <th class="apos-manage-column">{{ __('Type') }}</th>
            <th class="apos-manage-column">{{ __('Modified') }}</th>
            <th class="apos-manage-column">{{ __('Editor') }}</th>
            <th class="apos-manage-column">{{ __('Submitted?') }}</th>
            <th class="apos-manage-column">{{ __('Actions') }}</th>
          </tr>
        </thead>
        <tbody data-list>
          {% for doc in data.committable %}
            <tr data-apos-workflow-submission="{{ doc._id }}">
              {% if apos.utils.beginsWith(doc.slug, '/') %}
                <td><a href="{{ doc._url }}">{{ doc.title or doc.slug }}</a></td>
              {% else %}
                <td><a href="#" data-apos-edit-{{ doc.type }}="{{ doc._id }}">{{ doc.title or doc.slug }}</a></td>
              {% endif %}
              <td>{{ doc.type }}</td>
              <td>{{ doc.updatedAt | date('YYYY-MM-DD') }}</td>
              <td>{{ doc._lastEditor }}</td>
              <td>{% if doc.workflowSubmitted %}{{ __('Yes') }}{% else %}{{ __('No') }}{% endif %}</td>
              <td>
                {% if apos.utils.beginsWith(doc.slug, '/') %}
                  <a href="{{ doc._url }}">{{ __('Edit') }}</a>
                {% else %}
                  <a href="#" data-apos-edit-{{ doc.type }}="{{ doc._id }}">{{ __('Edit') }}</a>
                {% endif %}
                <a href="#" data-apos-workflow-commit="{{ doc._id }}">{{ __('Commit')</a>
                <a href="#" data-apos-workflow-revert-to-live="{{ doc._id }}">{{ __('Revert')</a>
              </td>
            </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>
  </div>
{%- endblock -%}

{%- block footerContainer -%}{%- endblock -%}
