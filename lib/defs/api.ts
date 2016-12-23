/**
 * Welcome to ng2tree
 */

/**
* This is the interface of the options input of the tree.
* See docs for more detailed explanations
*/
export interface ITreeOptions {
   /**
    * Override children field. Default: 'children'
    */
   childrenField?: string;
   /**
    * Override display field. Default: 'name'
    */
   displayField?: string;
   /**
    * Override id field. Default: 'id'
    */
   idField?: string;
   /**
    * Override isExpanded field. Default: 'isExpanded'
    */
   isExpandedField?:string;
   /**
    * Override isHidden field. Default: 'isHidden'
    */
   isHiddenField?:string;
   /**
    * Supply function for getting fields asynchronously. Should return a Promise
    */
   getChildren?: (node:ITreeNode) => any;
   /**
    * Change the default mouse and key actions on the tree
    */
   actionMapping?: any;
   /**
    * Allow drag and drop on the tree. Default: false
    */
   allowDrag?: boolean;
   /**
    * deprecated
    */
   treeNodeTemplate?: any;
   /**
    * deprecated
    */
   loadingComponent?: any;
   /**
    * deprecated
    */
   hasCustomContextMenu?: any;
   /**
    * deprecated
    */
   context?: any;
 }

/**
 * This is the interface of a single Tree Node
 */
export interface ITreeNode {
  // properties
  /**
   * Parent node
   */
  parent: ITreeNode;
  /**
   * The value of the node's field that is used for displaying its content.
   * By default 'name', unless stated otherwise in the options
   */
  displayField: string;
  /**
   * The children of the node.
   * By default is determined by 'node.data.children', unless stated otherwise in the options
   */
  children: ITreeNode[];
  /**
   * Pointer to the original data.
   */
  data: any;
  /**
   * Pointer to the ElementRef of the TreeNodeComponent that's displaying this node
   */
  elementRef: any;
  /**
   * Level in the tree (starts from 1).
   */
  level: number;
  /**
   * Path in the tree: Array of IDs.
   */
  path: string[];

  /**
   * A unique key of this node among its siblings.
   * By default it's the 'id' of the original node, unless stated otherwise in options.idField
   */
  id: any;

  /**
   * The context that was given in the options object.
   */
  context:any;

  // helpers
  isExpanded: boolean;
  isActive: boolean;
  isFocused:boolean;
  isCollapsed:boolean;
  isLeaf:boolean;
  hasChildren:boolean;
  isRoot:boolean;

  // traversing
  /**
   * @param skipHidden whether to skip hidden nodes
   * @returns next sibling (or null)
   */
  findNextSibling(skipHidden): ITreeNode;
  /**
   * @param skipHidden whether to skip hidden nodes
   * @returns previous sibling (or null)
   */
  findPreviousSibling(skipHidden): ITreeNode;
  /**
   * @param skipHidden whether to skip hidden nodes
   * @returns first child (or null)
   */
  getFirstChild(skipHidden): ITreeNode;
  /**
   * @param skipHidden whether to skip hidden nodes
   * @returns last child (or null)
   */
  getLastChild(skipHidden): ITreeNode;
  /**
   * Finds the visually next node in the tree.
   * @param goInside whether to look for children or just siblings
   * @returns next node.
   */
  findNextNode(goInside: boolean): ITreeNode;
  /**
   * Finds the visually previous node in the tree.
   * @param skipHidden whether to skip hidden nodes
   * @returns previous node.
   */
  findPreviousNode(skipHidden): ITreeNode;

  // actions
  /**
   * Expands / Collapses the node
   */
  toggleExpanded();
  /**
   * Expands the node
   */
  expand();
  /**
   * Collapses the node
   */
  collapse();
  /**
   * Expands all ancestors of the node
   */
  ensureVisible();
  /**
   * Activates / Deactivates the node (selects / deselects)
   */
  toggleActivated(multi);
  /**
   * Focus on the node
   */
  focus();
  /**
   * Blur (unfocus) the node
   */
  blur();
  /**
   * Scroll the screen to make the node visible
   */
  scrollIntoView();
  /**
   * Fire an event to the renderer of the tree (if it was registered)
   */
  fireEvent(event: any);
}

/**
 * This is the interface of the TreeModel
 */
export interface ITreeModel {
  // properties
  /**
   * All root nodes
   */
  roots: ITreeNode[];
  /**
   * Current active (selected) node
   */
  getActiveNode(): ITreeNode;
  /**
   * Current focused node
   */
  focusedNode: ITreeNode;
  /**
   * Options that were passed to the tree component
   */
  options: ITreeOptions;

  /**
   * Is the tree currently focused
   */
  isFocused: boolean;

  // helpers
  /**
   * @returns      first root of the tree
   */
  getFirstRoot(): ITreeNode;
  /**
   * @returns      last root of the tree
   */
  getLastRoot(): ITreeNode;

  // actions
  /**
   * Focuses or blurs the tree
   * @param value  true or false - whether to set focus or blur.
   */
  setFocus(value: boolean);
  /**
   * Focuses on the next node in the tree (same as down arrow)
   */
  focusNextNode();
  /**
   * Focuses on the previous node in the tree (same as up arrow)
   */
  focusPreviousNode();
  /**
   * Focuses on the inner child of the current focused node (same as right arrow on an expanded node)
   */
  focusDrillDown();
  /**
   * Focuses on the parent of the current focused node (same as left arrow on a collapsed node)
   */
  focusDrillUp();
  /**
   * Marks isHidden field in all nodes recursively according to the filter param.
   * If a node is marked visible, all of its ancestors will be marked visible as well.
   * @param filter  either a string or a function.
   *   In case it's a string, it will be searched case insensitively in the node's display attribute
   *   In case it's a function, it will be passed the node, and should return true if the node should be visible, false otherwise
   * @param autoShow  if true, make sure all nodes that passed the filter are visible
   */
  filterNodes(filter, autoShow?:boolean);
  /**
   * Marks all nodes isHidden = false
   */
  clearFilter();
  /**
   * moves a node from one location in the tree to another
   * @param location  has a from and a to attributes, each has a node and index attributes.
     The combination of node + index tells which node needs to be moved, and to where
   */
  moveNode(location:{ from:{node:ITreeNode, index:number}, to:{node:ITreeNode, index:number} });

  /**
   * Gets the current dragged node. Useful for overriding the drop action.
   * @param node  The parent node of the current dragged node
   * @param index  The index inside parent's children, of the current dragged node
   */
  getDragNode():{ node: ITreeNode, index:number };
}
