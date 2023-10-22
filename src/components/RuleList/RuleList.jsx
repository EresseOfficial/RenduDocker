// local dependencies
import Rule from "../Rule/Rule";

/**
 * Display list of rules.
 */
function RuleList({ rules, setRules }) {
  // LOCAL CODE HERE //
  // const deleteRule = (index) => {
  //   const newRules = [...rules];
  //   newRules.splice(index, 1);
  //   setRules(newRules);
  // };

  // NEW CODE TO FETCH DATA FROM API //
  // function to delete a rule from the list
  const deleteRule = async (id, index) => {
    try {
      // Send DELETE request to API.
      const response = await fetch(`http://localhost:3000/api/rules/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        // if the response is not 200, we throw an error
        throw new Error('Network response was not ok');
      }

      // If delete was successful, update rules locally.
      const newRules = [...rules];
      newRules.splice(index, 1);
      setRules(newRules);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  // useEffect(() => {
  //   alert('Rules list updated');
  // }, [rules]);

  return (
    rules &&
    rules.map((rule, index) => (
      <Rule key={rule.id} rule={rule} index={index} onDelete={deleteRule} />
    ))
  );
}

export default RuleList;
